"use server";
import { createClient } from "@/utils/supabase/server-client";
import { postSchema } from "./schemas";
import { z } from "zod";
import { slugify } from "@/utils/supabase/slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const EditPost = async ({
  postId,
  userData
}: {
  postId: number;
  userData: z.infer<typeof postSchema>;
}) => {
  const parsedData = postSchema.parse(userData);
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();
  if (!user || user.id !== post?.user_id) throw new Error("Unauthorized");

  const { data: updatedPost } = await supabase
    .from("posts")
    .update({
      title: parsedData.title,
      content: parsedData.content,
      slug: slugify(parsedData.title)
    })
    .eq("id", postId)
    .select("slug")
    .throwOnError();

  if (error) throw error;
  revalidatePath("/");
  redirect(`/${updatedPost}`);
};
