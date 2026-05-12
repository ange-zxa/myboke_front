import { Post } from "@/lib/types";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
