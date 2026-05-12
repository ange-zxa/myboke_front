import { Comment } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getComments(postSlug: string): Promise<Comment[]> {
  const res = await fetch(
    `${API_URL}/api/comments?postSlug=${encodeURIComponent(postSlug)}`
  );
  if (!res.ok) return [];
  return res.json();
}

export async function postComment(comment: {
  postSlug: string;
  author: string;
  email?: string;
  content: string;
}): Promise<Comment> {
  const res = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
}
