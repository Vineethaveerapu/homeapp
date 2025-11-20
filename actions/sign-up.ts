"use server";

import { createClient } from "@/utils/supabase/server-client";
import { redirect } from "next/navigation";
import { signUpSchema } from "./schemas";
import z from "zod";

export type SignUpResponse = { error: string };

export const SignUp = async (
  userdata: z.infer<typeof signUpSchema>
): Promise<SignUpResponse | void> => {
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.signUp(userdata);

  if (error) {
    return { error: "Error: User already exists" };
  }

  if (user && user.email) {
    const { error: userError } = await supabase
      .from("users")
      .insert([
        { id: user.id, email: user.email, username: userdata.username }
      ]);

    if (userError) {
      return { error: "Error: Failed to create user in database" };
    }
  }

  redirect("/");
};
