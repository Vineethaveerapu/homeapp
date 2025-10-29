import { getSinglePost } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Comments from "./Comments";

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error loading post
          </h2>
          <p className="text-gray-600">Post not found or error occurred</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Post not found
          </h2>
          <p className="text-gray-600">The requested post could not be found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {data && (
        <>
          {/* Main Post Card */}
          <article className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="p-8 border-b border-gray-300">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
                {data.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {data.users?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">By {data.users?.username}</span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            {data.image && (
              <div className="m-auto p-4">
                <img
                  src={data.image}
                  alt={data.title}
                  width="100%"
                  height="auto"
                />
              </div>
            )}

            {/* Content Section */}
            {data.content && (
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {data.content}
                  </div>
                </div>
              </div>
            )}

            {/* Author Actions */}
            {isAuthor && (
              <div className="p-8 border-t border-gray-300">
                <div className="flex space-around  ">
                  <DeleteButton postId={data.id} />
                  <EditButton slug={data.slug} />
                </div>
              </div>
            )}
          </article>

          {/* Comments Section */}
          <Comments
            postId={data.id}
            postAuthorId={data.user_id}
            currentUserId={user?.id || null}
            isAuthenticated={!!user}
          />
        </>
      )}
    </div>
  );
};

export default SinglePost;
