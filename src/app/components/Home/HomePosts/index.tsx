import { HomePostType } from "@/utils/supabase/queries";
import Link from "next/link";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  return (
    <div>
      {posts &&
        posts.map(({ id, title, slug, users }) => (
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
