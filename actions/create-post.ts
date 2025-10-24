"use server";

import { slugify } from "@/utils/supabase/slugify";
import { postSchema } from "./schemas";
import z from "zod";
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

export const createPost = async (userdata: z.infer<typeof postSchema>) => {
  const parsedData = postSchema.parse(userdata);
  const slug = slugify(parsedData.title);

  const imageFile = userdata.image?.get("image") as File | undefined;
  if (!(imageFile instanceof File) && imageFile !== null) {
    throw new Error("Invalid image file");
  }

  const publicImageUrl = imageFile ? await uploadImage(imageFile) : null;

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not Authorized");
  }

  const userId = user.id;

  // Check if a post with this title already exists
  const { data: existingPost } = await supabase
    .from("posts")
    .select("id")
    .eq("title", parsedData.title)
    .single();

  if (existingPost) {
    throw new Error(
      "A post with this title already exists. Please choose a different title."
    );
  }

  await supabase
    .from("posts")
    .insert([
      { user_id: userId, slug: slug, ...parsedData, image: publicImageUrl }
    ])
    .throwOnError();

  revalidatePath("/");
  redirect(`/${slug}`);
};
