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
          placeholder="昵称"
          className="flex-1 px-0 py-1.5 border-b border-gray-200 dark:border-gray-700 text-sm bg-transparent focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱 (选填)"
          className="flex-1 px-0 py-1.5 border-b border-gray-200 dark:border-gray-700 text-sm bg-transparent focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        rows={3}
        className="w-full px-0 py-1.5 border-b border-gray-200 dark:border-gray-700 text-sm bg-transparent focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-y"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-200 transition-colors disabled:opacity-30"
      >
        {submitting ? "提交中..." : "发表评论"}
      </button>
    </form>
  );
}
