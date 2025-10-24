"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeletePost from "../../../../../actions/delete-post";
import { toast } from "sonner";

const DeleteButton = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: DeletePost,
    onMutate: () => toast("Deleting your post"),
    onSuccess: () => {
      // Invalidate and refetch home posts after successful deletion
      queryClient.invalidateQueries({ queryKey: ["home-posts"] });
      toast.success("Post deleted!");
    },
    onError: (error) => {
      toast.error("Failed to delete post");
      console.error("Delete error:", error);
    }
  });

  return (
    <button
      onClick={() => mutate(postId)}
      className="button-tertiary"
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
};

export default DeleteButton;
