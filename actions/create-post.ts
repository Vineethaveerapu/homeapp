"use server";

import { slugify } from "@/utils/supabase/slugify";
import { postSchema } from "./schemas";
import z from "zod";
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

export const createPost = async (userdata: z.infer<typeof postSchema>) => {
  try {
    const parsedData = postSchema.parse(userdata);
    let slug = slugify(parsedData.title);

    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Not Authorized" };
    }

    const userId = user.id;

    // Check if a post with this title already exists
    const { data: existingPostByTitle } = await supabase
      .from("posts")
      .select("id")
      .eq("title", parsedData.title)
      .maybeSingle();

    if (existingPostByTitle) {
      return {
        error:
          "A post with this title already exists. Please choose a different title."
      };
    }

    // Check if a post with this slug already exists and  unique
    const { data: existingPost } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existingPost) {
      // Make slug unique by appending timestamp
      slug = `${slug}-${Date.now()}`;
    }

    const imageFile = userdata.image?.get("image") as File | undefined;
    if (!(imageFile instanceof File) && imageFile !== null) {
      return { error: "Invalid image file" };
    }

    const publicImageUrl = imageFile ? await uploadImage(imageFile) : null;

    await supabase
      .from("posts")
      .insert([
        { user_id: userId, slug: slug, ...parsedData, image: publicImageUrl }
      ])
      .throwOnError();

    revalidatePath("/");
    redirect(`/${slug}`);
  } catch (error) {
    // If it's a redirect error, re-throw it
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
};
