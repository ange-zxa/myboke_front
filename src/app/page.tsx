import { getAllPosts, getAllTags } from "@/lib/posts";
import PostList from "@/components/PostList";
import TagBadge from "@/components/TagBadge";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Blog</h1>
        <p className="text-gray-500">分享技术文章与生活感悟</p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            最新文章
          </h2>
          <PostList posts={posts} />
        </section>

        <aside>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">标签云</h2>
          {tags.length === 0 ? (
            <p className="text-sm text-gray-400">暂无标签</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagBadge key={tag.name} name={tag.name} count={tag.count} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
