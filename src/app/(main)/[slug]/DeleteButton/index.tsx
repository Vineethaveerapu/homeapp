"use client";
import { useMutation } from "@tanstack/react-query";
import DeletePost from "../../../../../actions/delete-post";
import { toast } from "sonner";

const DeleteButton = ({ postId }: { postId: number }) => {
  const { mutate, error } = useMutation({
    mutationFn: DeletePost,
    onMutate: () => toast("Deleting your post"),
    onSettled: () => toast.success("Post deleted!")
  });
  return (
    <button onClick={() => mutate(postId)} className="button-tertiary">
      Delete Post
    </button>
  );
};

export default DeleteButton;
