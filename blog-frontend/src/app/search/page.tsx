import { searchPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: "搜索 - My Blog",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = q ? searchPosts(q) : [];

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
