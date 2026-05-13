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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={category ? `搜索 ${category} 下的文章...` : "搜索文章..."}
        className="flex-1 px-3 py-1.5 border-b border-gray-200 text-sm bg-transparent focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
      />
      <button
        type="submit"
        className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        搜索
      </button>
    </form>
  );
}
