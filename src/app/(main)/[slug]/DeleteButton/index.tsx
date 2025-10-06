"use client";
import DeletePost from "../../../../../actions/delete-post";

const DeleteButton = ({ postId }: { postId: number }) => {
  return (
    <button onClick={() => DeletePost(postId)} className="button-tertiary">
      Delete Post
    </button>
  );
};

export default DeleteButton;
