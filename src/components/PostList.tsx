import { Post } from "@/lib/types";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-sm text-gray-400">
        暂无文章
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
