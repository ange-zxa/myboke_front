import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const CACHE_PATH = path.join(process.cwd(), "content/summaries.json");

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

interface SummaryCache {
  [slug: string]: string;
}

function loadCache(): SummaryCache {
  if (fs.existsSync(CACHE_PATH)) {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  }
  return {};
}

function saveCache(cache: SummaryCache) {
  const dir = path.dirname(CACHE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function walkMdFiles(dir: string): { fullPath: string; slug: string }[] {
  const results: { fullPath: string; slug: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  function walk(d: string) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".md")) {
        results.push({ fullPath: full, slug: path.basename(full, ".md") });
      }
    }
  }
  walk(dir);
  return results;
}

async function generateSummary(title: string, content: string): Promise<string> {
  const prompt = `请为以下技术博客文章写一个简短的中文摘要（1-2句话，不超过100字），直接输出摘要内容，不要加任何前缀或说明：

标题：${title}

内容：${content.slice(0, 2000)}`;

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    throw new Error(`DeepSeek API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.choices[0].message.content.trim();
}

async function main() {
  if (!DEEPSEEK_API_KEY) {
    console.log("⚠ 未设置 DEEPSEEK_API_KEY，跳过摘要生成");
    process.exit(0);
  }

  const cache = loadCache();
  const files = walkMdFiles(POSTS_DIR);

  for (const file of files) {
    if (cache[file.slug]) {
      console.log(`⏭  跳过: ${file.slug} (已有摘要)`);
      continue;
    }

    const content = fs.readFileSync(file.fullPath, "utf8");
    const title = file.slug;

    console.log(`🤖 生成摘要: ${file.slug} ...`);
    try {
      const summary = await generateSummary(title, content);
      cache[file.slug] = summary;
      console.log(`   ✅ ${summary}`);
    } catch (err) {
      console.error(`   ❌ ${err}`);
    }
  }

  saveCache(cache);
  console.log(`\n已保存 ${Object.keys(cache).length} 条摘要到 ${CACHE_PATH}`);
}

main();
