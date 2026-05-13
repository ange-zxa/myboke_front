import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, Category } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

function walkPosts(dir: string): { fullPath: string; category: string; subcategory: string | null }[] {
  const results: { fullPath: string; category: string; subcategory: string | null }[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subdirs = fs.readdirSync(fullPath, { withFileTypes: true });
      for (const sub of subdirs) {
        if (sub.isDirectory()) {
          // subcategory directory level
          const files = fs.readdirSync(path.join(fullPath, sub.name));
          for (const f of files) {
            if (f.endsWith(".md")) {
              results.push({
                fullPath: path.join(fullPath, sub.name, f),
                category: entry.name,
                subcategory: sub.name,
              });
            }
          }
        } else if (sub.name.endsWith(".md")) {
          results.push({
            fullPath: path.join(fullPath, sub.name),
            category: entry.name,
            subcategory: null,
          });
        }
      }
    } else if (entry.name.endsWith(".md")) {
      // Legacy: flat files directly in posts/
      results.push({
        fullPath,
        category: "未分类",
        subcategory: null,
      });
    }
  }
  return results;
}

function autoTitle(content: string, slug: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : slug;
}

function autoDate(fullPath: string): string {
  const stat = fs.statSync(fullPath);
  const d = stat.birthtime || stat.mtime;
  return d.toISOString().slice(0, 10);
}

function loadSummaryCache(): Record<string, string> {
  const cachePath = path.join(process.cwd(), "content", "summaries.json");
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, "utf8"));
  }
  return {};
}

function autoExcerpt(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith(">")) continue;
    if (trimmed.startsWith("---")) continue;
    return trimmed.slice(0, 150).replace(/[#*`]/g, "");
  }
  return "";
}

function stripTitleHeading(content: string, title: string): string {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return content.replace(new RegExp(`^\\n*#{1,2}\\s+${escaped}\\s*\\n+`), "");
}

function parsePost(fullPath: string, category: string, subcategory: string | null, summaryCache: Record<string, string>): Post {
  const slug = path.basename(fullPath, ".md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const title = data.title || autoTitle(content, slug);
  const excerpt = data.excerpt || summaryCache[slug] || autoExcerpt(content);

  return {
    slug,
    title,
    date: data.date || autoDate(fullPath),
    category,
    ...(subcategory ? { subcategory } : {}),
    excerpt,
    content: stripTitleHeading(content, title),
  };
}

export function getAllPosts(): Post[] {
  const summaryCache = loadSummaryCache();
  const files = walkPosts(postsDirectory);
  return files
    .map((f) => parsePost(f.fullPath, f.category, f.subcategory, summaryCache))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getLatestPosts(n: number): Post[] {
  return getAllPosts().slice(0, n);
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getCategories(): Category[] {
  const posts = getAllPosts();
  const catMap = new Map<string, Set<string>>();

  for (const post of posts) {
    if (!catMap.has(post.category)) {
      catMap.set(post.category, new Set());
    }
    if (post.subcategory) {
      catMap.get(post.category)!.add(post.subcategory);
    }
  }

  return Array.from(catMap.entries()).map(([name, subSet]) => ({
    name,
    subcategories: Array.from(subSet).sort(),
  }));
}

export function getPostsByCategory(category: string, subcategory?: string): Post[] {
  return getAllPosts().filter((p) => {
    if (decodeURIComponent(p.category) !== decodeURIComponent(category)) return false;
    if (subcategory && decodeURIComponent(p.subcategory || "") !== decodeURIComponent(subcategory)) return false;
    return true;
  });
}

/** Returns posts.json-safe data (no content body) */
export function getPostsMeta(): Omit<Post, "content">[] {
  return getAllPosts().map(({ content: _c, ...rest }) => rest);
}

export function searchPosts(query: string): Post[] {
  const posts = getAllPosts();
  const q = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
  );
}
