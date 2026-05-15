"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

interface Props {
  category?: string;
}

export default function SearchBar({ category }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams();
      params.set("q", query.trim());
      if (category) params.set("category", category);
      router.push(`/search?${params.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={category ? `搜索 ${category} 下的文章...` : "在所有文档中搜索"}
        className="w-full pl-3 pr-10 py-2 border border-[#d0d7de] dark:border-gray-700 rounded-md bg-white dark:bg-transparent text-sm focus:outline-none focus:border-[#0550ae] dark:focus:border-gray-400 focus:ring-2 focus:ring-[#0550ae]/10 dark:focus:ring-0 transition-colors placeholder:text-[#8b949e] dark:placeholder:text-gray-600"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 bottom-0 px-3 text-[#8b949e] dark:text-gray-500 hover:text-[#1f2328] dark:hover:text-gray-200 transition-colors"
        aria-label="搜索"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>
    </form>
  );
}
