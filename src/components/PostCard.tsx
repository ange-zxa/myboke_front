import Link from "next/link";
import { Post } from "@/lib/types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <Link href={`/posts/${post.slug}`} className="group block py-3">
        <div className="flex items-baseline gap-4">
          <time className="text-xs text-gray-400 flex-shrink-0 tabular-nums min-w-[5rem]">
            {post.date}
          </time>
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors truncate">
              {post.title}
            </h2>
          </div>
        </div>
      </Link>
    </article>
  );
}
