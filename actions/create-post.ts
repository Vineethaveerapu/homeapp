"use server";

import { slugify } from "@/utils/supabase/slugify";
import { postSchema } from "./schemas";
import z from "zod";
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (userdata: z.infer<typeof postSchema>) => {
  const parsedData = postSchema.parse(userdata);
  const slug = slugify(parsedData.title);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not Authorized");
  }

  const userId = user.id;

  await supabase
    .from("posts")
    .insert([{ user_id: userId, slug: slug, ...parsedData }])
    .throwOnError();

  revalidatePath("/");
  redirect(`/${slug}`);
};
