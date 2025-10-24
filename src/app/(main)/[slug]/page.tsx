import { getSinglePost } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log("Fetching post for slug:", slug);
  const { data, error } = await getSinglePost(slug);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const isAuthor = user?.id === data?.user_id ? true : false;

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
    <>
      {data && (
        <>
          <div className="mt-10">
            <Link className="button-tertiary " href="/">
              Back to Home
            </Link>
          </div>
          <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-red-500">{data.title}</h2>
            <p className="text-lg text-gray-500 mt-4">
              Author: {data.users?.username}
            </p>
            {/* <p>author : {data.user_id}</p>
            <p>logged in: {user?.id}</p> */}
          </div>
          {data.image && (
            <div className=" w-lg m-auto p-4 bg-gray-100 rounded-lg mt-4"></div>
          )}
          <div className="m-auto p-4 bg-gray-100 rounded-lg mt-4">
            {data.content && <div>{data.content}</div>}
          </div>
          {isAuthor && (
            <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
              <DeleteButton postId={data.id} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SinglePost;
