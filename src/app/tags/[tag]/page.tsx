import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostList from "@/components/PostList";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签: ${tag} - My Blog`,
    description: `查看标签为 "${tag}" 的所有文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block"
        >
          &larr; 返回首页
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          标签: <span className="text-blue-600">{tag}</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">共 {posts.length} 篇文章</p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
