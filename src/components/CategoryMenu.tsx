"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/types";

interface Props {
  categories: Category[];
  currentCategory?: string;
  onSearch?: (query: string) => void;
}

export default function CategoryMenu({ categories, currentCategory, onSearch }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
    if (onSearch) onSearch("");
  }, [currentCategory]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    if (onSearch) {
      onSearch(q);
    } else {
      const params = new URLSearchParams();
      params.set("q", q);
      if (currentCategory) params.set("category", currentCategory);
      router.push(`/search?${params.toString()}`);
    }
  }

  if (categories.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-5 text-sm border-b border-gray-100 pb-2">
        <button
          onClick={() => {
            setSearchQuery("");
            if (onSearch) onSearch("");
            router.push("/");
          }}
          className="text-gray-400 hover:text-gray-900 transition-colors"
        >
          最新发布
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setSearchQuery("");
              if (onSearch) onSearch("");
              if (cat.subcategories.length > 0) {
                setExpanded(expanded === cat.name ? null : cat.name);
              } else {
                router.push(`/category/${encodeURIComponent(cat.name)}`);
              }
            }}
            className={`transition-colors ${
              expanded === cat.name
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            {cat.name}
          </button>
        ))}

        <form onSubmit={handleSearchSubmit} className="ml-auto flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentCategory ? `在 ${currentCategory} 中搜索...` : "搜索文章..."}
            className="w-32 px-0 py-0.5 border-b border-gray-200 text-sm bg-transparent focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
          />
          <button
            type="submit"
            className="text-gray-400 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>

      {expanded && (
        <div className="flex items-center gap-4 mt-2 text-xs">
          {categories
            .find((c) => c.name === expanded)
            ?.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  router.push(
                    `/category/${encodeURIComponent(expanded)}/${encodeURIComponent(sub)}`
                  )
                }
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                {sub}
              </button>
            ))}
          <button
            onClick={() =>
              router.push(`/category/${encodeURIComponent(expanded)}`)
            }
            className="text-gray-300 hover:text-gray-700 transition-colors"
          >
            全部
          </button>
        </div>
      )}
    </div>
  );
}
