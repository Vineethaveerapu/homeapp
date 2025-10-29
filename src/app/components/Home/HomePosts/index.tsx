"use client";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/browser-client";
import { useMemo } from "react";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  const supabase = useMemo(() => createClient(), []);

  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts(supabase);
      if (error) {
        throw error;
      }
      return data;
    },
    initialData: posts,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  return (
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
  );
};

export default HomePosts;
