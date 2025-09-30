"use server";

import { createClient } from "@/utils/supabase/server-client";

export const SignUp = async (formdata: FormData) => {
  const userdata = {
    email: formdata.get("email") as string,
    username: formdata.get("username") as string,
    password: formdata.get("password") as string
  };

  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.signUp(userdata);

  if (error) {
    throw error;
  }

  if (user && user.email) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        { id: user.id, email: user.email, username: userdata.username }
      ]);

    if (insertError) {
      throw insertError;
    }
  }

  return;
};
