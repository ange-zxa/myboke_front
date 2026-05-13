"use client";

import { useEffect, useState } from "react";
import { Post } from "@/lib/types";
import PostList from "@/components/PostList";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

function searchPostsLocally(posts: Post[], query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function SearchPage() {
  const [q, setQ] = useState("");
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
    setQ(query);
    if (query && posts.length > 0) {
      setResults(searchPostsLocally(posts, query));
    }
  }, [posts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block"
        >
          &larr; 返回首页
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">搜索文章</h1>
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>

      {q ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            搜索 &ldquo;{q}&rdquo; 找到 {results.length} 篇文章
          </p>
          <PostList posts={results} />
        </>
      ) : (
        <p className="text-gray-400 text-sm">输入关键词搜索文章</p>
      )}
    </div>
  );
}
