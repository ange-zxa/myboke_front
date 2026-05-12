import { getAllPosts } from "../src/lib/posts";
import fs from "fs";
import path from "path";

const posts = getAllPosts().map(({ content, ...rest }) => rest);

const outDir = path.join(process.cwd(), "public");
const outPath = path.join(outDir, "posts.json");

fs.writeFileSync(outPath, JSON.stringify(posts), "utf8");
console.log(`Generated ${outPath} with ${posts.length} posts`);
