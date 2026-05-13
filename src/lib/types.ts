export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  subcategory?: string;
  excerpt: string;
  content: string;
}

export interface Category {
  name: string;
  subcategories: string[];
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
