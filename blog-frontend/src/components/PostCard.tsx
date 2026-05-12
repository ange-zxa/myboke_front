import Link from "next/link";
import TagBadge from "./TagBadge";
import { Post } from "@/lib/types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.category}</span>
      </div>
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{post.excerpt}</p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <TagBadge key={tag} name={tag} />
        ))}
      </div>
    </article>
  );
}
