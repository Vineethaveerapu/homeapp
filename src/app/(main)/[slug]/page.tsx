import { getSinglePost } from "@/utils/supabase/queries";
import Link from "next/link";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log("Fetching post for slug:", slug);
  const { data, error } = await getSinglePost(slug);

  if (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="w-[80%] m-auto">
        <h2 className="text-2xl font-bold text-red-500">Error loading post</h2>
        <p className="text-lg text-gray-500">
          Post not found or error occurred
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-[80%] m-auto">
        <h2 className="text-2xl font-bold text-red-500">Post not found</h2>
        <p className="text-lg text-gray-500">
          The requested post could not be found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="w-[80%] m-auto my-6">
        <Link className="button-tertiary " href="/">
          Back to Home
        </Link>
      </div>
      <div className="w-[80%] m-auto">
        <h2 className="text-2xl font-bold text-red-500">{data.title}</h2>
        <p className="text-lg text-gray-500">Author: {data.users?.username}</p>
      </div>
      <div className="w-[80%] m-auto">
        {data.content && (
          <div className="m-auto p-4 bg-gray-100 rounded-lg mt-4">
            <div className="prose max-w-none">{data.content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
