export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  content: string;
}

export interface Comment {
  id: string;
  postSlug: string;
  author: string;
  email?: string;
  content: string;
  createdAt: string;
  parentId?: string;
}
