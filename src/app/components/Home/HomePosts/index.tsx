"use client";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts();
      if (error) {
        throw error;
      }
      return data;
    },
    initialData: posts,
    refetchOnMount: false,
    staleTime: 10000
  });

  return (
    <div>
      {data &&
        data.map(({ id, title, slug, users }) => (
          <Link
            href={`/posts/${slug}`}
            className="block border-1 rounded-xl p-4 mt-4 "
            key={id}
          >
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="text-right"> {users.username}</div>
          </Link>
        ))}
    </div>
  );
};

export default HomePosts;
