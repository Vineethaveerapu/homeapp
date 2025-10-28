"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../../../../actions/create-comment";
import { toast } from "sonner";

const CommentForm = ({
  postId,
  onSuccess
}: {
  postId: number;
  onSuccess?: () => void;
}) => {
  const [content, setContent] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: (result) => {
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Comment added!");
        setContent("");
        onSuccess?.();
      }
    },
    onError: (error) => {
      toast.error("Failed to add comment");
      console.error("Comment error:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    mutate({ content, postId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          rows={3}
          maxLength={1000}
          disabled={isPending}
        />
      </div>
      <button
        type="submit"
        className="button-primary"
        disabled={isPending || !content.trim()}
      >
        {isPending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
