import { createClient } from "@/utils/supabase/server-client";
import { getHomePosts } from "../../utils/supabase/queries";
import HomePosts from "@/app/components/Home/HomePosts";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) {
    console.error("Home: error", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-[80%] m-auto">
      <HomePosts posts={data!} />
    </div>
  );
}
