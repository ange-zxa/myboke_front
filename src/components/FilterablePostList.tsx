"use client";

import { useState, useEffect } from "react";
import { Post, Category } from "@/lib/types";
import PostList from "./PostList";
import CategoryMenu from "./CategoryMenu";

interface Props {
  posts: Post[];
  categories: Category[];
  currentCategory?: string;
}

export default function FilterablePostList({ posts, categories, currentCategory }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  function handleSearch(query: string) {
    if (!query) {
      setFilteredPosts(posts);
      return;
    }
    const q = query.toLowerCase();
    setFilteredPosts(
      posts.filter((p) => p.title.toLowerCase().includes(q))
    );
  }

  return (
    <>
      <CategoryMenu
        categories={categories}
        currentCategory={currentCategory}
        onSearch={handleSearch}
      />
      <PostList posts={filteredPosts} />
    </>
  );
}
