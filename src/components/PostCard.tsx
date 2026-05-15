import Link from "next/link";
import { Post } from "@/lib/types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <Link
        href={`/posts/${post.slug}`}
        className="group flex items-baseline gap-4 px-3 py-2.5 -mx-3 rounded-md hover:bg-[#eef1f5] dark:hover:bg-gray-800/50 transition-colors"
      >
        <time className="text-xs text-[#8b949e] dark:text-gray-400 flex-shrink-0 tabular-nums min-w-[5.5rem] font-mono">
          {post.date}
        </time>
        <div className="min-w-0 flex items-center gap-2">
          <h2 className="text-sm font-medium text-[#1f2328] dark:text-gray-100 group-hover:text-[#0550ae] dark:group-hover:text-emerald-400 transition-colors truncate">
            {post.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}
