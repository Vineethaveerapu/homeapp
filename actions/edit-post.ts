"use server";
import { createClient } from "@/utils/supabase/server-client";
import { postSchema } from "./schemas";
import { z } from "zod";
import { slugify } from "@/utils/supabase/slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/utils/supabase/upload-image";

export const EditPost = async ({
  postId,
  userData
}: {
  postId: number;
  userData: z.infer<typeof postSchema>;
}) => {
  const parsedData = postSchema.parse(userData);

  const imageFile = userData.image?.get("image");

  let publicImageUrl;
  if (typeof imageFile !== "string" && imageFile !== undefined) {
    if (!(imageFile instanceof File) && imageFile !== null) {
      return { error: "Invalid image file" };
    }
    publicImageUrl = await uploadImage(imageFile!);
  } else {
    publicImageUrl = imageFile;
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (postError) throw new Error("Post not found");
  if (!user || user.id !== post?.user_id) throw new Error("Unauthorized");

  const { data: updatedPost, error: updateError } = await supabase
    .from("posts")
    .update({
      title: parsedData.title,
      content: parsedData.content,
      slug: slugify(parsedData.title),
      image: publicImageUrl
    })
    .eq("id", postId)
    .select("slug")
    .single();

  if (updateError) throw new Error("Failed to update post");
  revalidatePath("/");
  redirect(`/${updatedPost.slug}`);
};
