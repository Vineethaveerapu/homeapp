import { getHomePosts } from "../utils/supabase/queries";
import HomePosts from "@/app/components/Home/HomePosts";

export default async function Home() {
  const { data, error } = await getHomePosts();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-[80%] m-auto">
      <HomePosts posts={data!} />
    </div>
  );
}
