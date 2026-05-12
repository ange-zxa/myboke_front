"use client";

import { useState, FormEvent } from "react";

interface Props {
  postSlug: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ postSlug, onCommentAdded }: Props) {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      setError("昵称和内容不能为空");
      return;
    }
    setSubmitting(true);
    setError("");

    const { postComment } = await import("@/lib/api");

    try {
      await postComment({
        postSlug,
        author: author.trim(),
        email: email.trim() || undefined,
        content: content.trim(),
      });
      setAuthor("");
      setEmail("");
      setContent("");
      onCommentAdded();
    } catch {
      setError("评论提交失败，请确保后端服务正在运行");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="昵称 *"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱 (选填)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {submitting ? "提交中..." : "发表评论"}
      </button>
    </form>
  );
}
