"use server";

import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";

const DeletePost = async (postId: number) => {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    throw new Error("Failed to delete post");
  }

  revalidatePath("/");
  return { success: true };
};

export default DeletePost;
