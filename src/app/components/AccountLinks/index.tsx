import { createClient } from "@/utils/supabase/server-client";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

const AccountLinks = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  // console.log("User:", user);
  // console.log("Error:", error);

  return (
    <div className="flex flex-wrap gap-2">
      {user ? (
        <>
          <Link className="button-tertiary" href="/create">
            Create Post
          </Link>
          <LogOutButton />
        </>
      ) : (
        <Link className="button-secondary" href="/auth/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default AccountLinks;
