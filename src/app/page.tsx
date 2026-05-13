import { getLatestPosts, getCategories } from "@/lib/posts";
import FilterablePostList from "@/components/FilterablePostList";
import SearchBar from "@/components/SearchBar";
import Profile from "@/components/Profile";

export default function HomePage() {
  const posts = getLatestPosts(10);
  const categories = getCategories();

  return (
    <div className="max-w-2xl mx-auto px-6 py-4">
      <Profile />

      <div className="mb-6">
        <SearchBar />
      </div>

      <FilterablePostList key="home" posts={posts} categories={categories} currentCategory="最新发布" />
    </div>
  );
}
