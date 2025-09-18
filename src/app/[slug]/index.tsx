import { getSinglePost } from "@/utils/supabase/queries";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);
  return <div>{data && data.title}</div>;
};

export default SinglePost;
