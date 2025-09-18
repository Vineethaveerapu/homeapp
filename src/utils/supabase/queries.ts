import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async () => {
  const supabase = createClient();
  return await supabase
    .from("posts")
    .select('id, title, slug, users("username")')
    .order("created_at", { ascending: false });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase.from("posts").select("*").eq("slug", slug).single();
};

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;
