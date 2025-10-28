"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getCommentsByPostId,
  type CommentType
} from "@/utils/supabase/queries";
import CommentForm from "../CommentForm";
import DeleteCommentButton from "../DeleteCommentButton";

interface CommentsProps {
  postId: number;
  postAuthorId: string;
  currentUserId: string | null;
  isAuthenticated: boolean;
}

const Comments = ({
  postId,
  postAuthorId,
  currentUserId,
  isAuthenticated
}: CommentsProps) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const result = await getCommentsByPostId(postId);
      if (result.error) throw result.error;
      return result.data;
    }
  });

  const handleCommentSuccess = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="text-red-600">
        Error loading comments. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-6">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comments ({data?.length || 0})
        </h2>

        {/* Comment Form - Only for authenticated users */}
        {isAuthenticated ? (
          <div className="mb-8">
            <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
          </div>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-center">
              Please log in to post a comment
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-600">
              Loading comments...
            </div>
          ) : data && data.length > 0 ? (
            data.map((comment: CommentType) => {
              const isCommentAuthor = currentUserId === comment.user_id;
              const isPostAuthor = currentUserId === postAuthorId;
              const canDelete = isCommentAuthor || isPostAuthor;

              return (
                <div
                  key={comment.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div>
                        {isPostAuthor && currentUserId === comment.user_id && (
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            Author
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                      {canDelete && (
                        <DeleteCommentButton
                          commentId={comment.id}
                          onSuccess={handleCommentSuccess}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap ml-10">
                    {comment.content}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-600">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
