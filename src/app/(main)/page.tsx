import { createClient } from "@/utils/supabase/server-client";
import { getHomePosts } from "../../utils/supabase/queries";
import HomePosts from "@/app/components/Home/HomePosts";

import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) {
    console.error("Home: error", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-[80%] m-auto">
      <div>
        {data &&
          data.map(({ id, title, slug, users }) => (
            <Link
              href={`/${slug}`}
              className="block border-1 rounded-xl p-4 mt-4 "
              key={id}
            >
              <h2 className="text-xl font-bold">{title}</h2>
              <div className="text-right"> {users.username}</div>
            </Link>
          ))}
      </div>
    </div>
  );
}
