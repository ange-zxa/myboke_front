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
    <div className="mb-6">
      <div className="flex items-center gap-0 text-sm border-b border-[#d0d7de] dark:border-gray-800">
        <button
          onClick={() => {
            setSearchQuery("");
            if (onSearch) onSearch("");
            router.push("/");
          }}
          className="px-3 py-2 -mb-[1px] border-b-2 border-transparent text-[#656d76] dark:text-gray-400 hover:text-[#1f2328] dark:hover:text-gray-200 transition-colors"
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
            className={`px-3 py-2 -mb-[1px] border-b-2 transition-colors ${
              expanded === cat.name
                ? "border-[#0550ae] dark:border-emerald-400 text-[#1f2328] dark:text-gray-100"
                : "border-transparent text-[#656d76] dark:text-gray-400 hover:text-[#1f2328] dark:hover:text-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}

        <form onSubmit={handleSearchSubmit} className="ml-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentCategory ? `在 ${currentCategory} 中搜索...` : "搜索文章..."}
            className="w-40 pl-2.5 pr-8 py-1.5 text-xs border border-[#d0d7de] dark:border-gray-700 rounded-md bg-white dark:bg-transparent focus:outline-none focus:border-[#0550ae] dark:focus:border-gray-400 focus:ring-2 focus:ring-[#0550ae]/10 dark:focus:ring-0 transition-colors placeholder:text-[#8b949e] dark:placeholder:text-gray-600"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-2 text-[#8b949e] dark:text-gray-500 hover:text-[#1f2328] dark:hover:text-gray-200 transition-colors"
            aria-label="搜索"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>

      {expanded && (
        <div className="flex items-center gap-2 mt-2 px-3 text-xs">
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
                className="px-2 py-0.5 rounded-full border border-[#d0d7de] dark:border-gray-700 text-[#656d76] dark:text-gray-400 hover:bg-[#eef1f5] dark:hover:bg-gray-800 hover:text-[#1f2328] dark:hover:text-gray-200 transition-colors"
              >
                {sub}
              </button>
            ))}
          <button
            onClick={() =>
              router.push(`/category/${encodeURIComponent(expanded)}`)
            }
            className="text-[#8b949e] dark:text-gray-600 hover:text-[#1f2328] dark:hover:text-gray-300 transition-colors"
          >
            全部
          </button>
        </div>
      )}
    </div>
  );
}
