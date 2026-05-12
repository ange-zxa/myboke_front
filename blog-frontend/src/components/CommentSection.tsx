"use client";

import { useEffect, useState, useCallback } from "react";
import { Comment } from "@/lib/types";
import { getComments } from "@/lib/api";
import CommentForm from "./CommentForm";

interface Props {
  postSlug: string;
}

export default function CommentSection({ postSlug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const data = await getComments(postSlug);
    setComments(data);
    setLoading(false);
  }, [postSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        评论 ({comments.length})
      </h3>

      <CommentForm postSlug={postSlug} onCommentAdded={fetchComments} />

      {loading ? (
        <p className="text-sm text-gray-400">加载中...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400">暂无评论，来抢沙发吧</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
