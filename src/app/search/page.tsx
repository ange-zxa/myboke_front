"use client";

import { useEffect, useState } from "react";
import { Post } from "@/lib/types";
import PostList from "@/components/PostList";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

function searchPostsLocally(posts: Post[], query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter((p) => p.title.toLowerCase().includes(q));
}

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("./posts.json")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    const cat = params.get("category") || "";
    setQ(query);
    setCategory(cat);

    if (!query) return;

    let filtered = posts;
    if (cat) {
      filtered = filtered.filter((p) => p.category === cat);
    }
    filtered = searchPostsLocally(filtered, query);
    setResults(filtered);
  }, [posts]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link
        href="/"
        className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-6 inline-block"
      >
        &larr; 返回
      </Link>

      <div className="mb-8">
        <SearchBar category={category} />
      </div>

      {q || category ? (
        <>
          <p className="text-xs text-gray-400 mb-6">
            {category ? `在 "${category}" 中搜索` : "搜索"}{q ? ` "${q}"` : ""} 找到 {results.length} 篇文章
          </p>
          <PostList posts={results} />
        </>
      ) : (
        <p className="text-sm text-gray-300 dark:text-gray-600 text-center py-20">
          输入关键词搜索文章
        </p>
      )}
    </div>
  );
}
