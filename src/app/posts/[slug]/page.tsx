import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) return [{ slug: "_empty" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} - ange-zxa`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link
        href={`/category/${encodeURIComponent(post.category)}`}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-6 inline-block"
      >
        &larr; 返回 {post.category}
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <time>{post.date}</time>
            <span>·</span>
            <Link
              href={`/category/${encodeURIComponent(post.category)}`}
              className="hover:text-gray-600 transition-colors"
            >
              {post.category}
            </Link>
            {post.subcategory && (
              <>
                <span>·</span>
                <Link
                  href={`/category/${encodeURIComponent(post.category)}/${encodeURIComponent(post.subcategory)}`}
                  className="hover:text-gray-600 transition-colors"
                >
                  {post.subcategory}
                </Link>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-sm text-gray-500 leading-relaxed mb-4 border-l-2 border-gray-200 pl-3">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="prose prose-gray max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <hr className="border-gray-100 mb-8" />

      <CommentSection postSlug={slug} />
    </div>
  );
}
