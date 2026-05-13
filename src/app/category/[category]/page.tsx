import { getPostsByCategory, getCategories } from "@/lib/posts";
import FilterablePostList from "@/components/FilterablePostList";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  if (categories.length === 0) return [{ category: "_empty" }];
  return categories.map((cat) => ({ category: cat.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${decodeURIComponent(category)} - ange-zxa`,
    description: `查看分类 "${decodeURIComponent(category)}" 下的所有文章`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const catName = decodeURIComponent(category);
  const posts = getPostsByCategory(category);
  const categories = getCategories();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link
        href="/"
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-6 inline-block"
      >
        &larr; 返回首页
      </Link>

      <h1 className="text-lg font-semibold text-gray-900 mb-2">
        {catName}
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        共 {posts.length} 篇文章
      </p>

      <FilterablePostList key={catName} posts={posts} categories={categories} currentCategory={catName} />
    </div>
  );
}
