"use client";
import { Tables } from "@/utils/supabase/database.types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { EditPost } from "../../../../../../actions/edit-post";

const EditForm = ({
  postId,
  initialValues
}: {
  postId: number;
  initialValues: Pick<Tables<"posts">, "title" | "content">;
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content
    }
  });

  const { mutate, error } = useMutation({
    mutationFn: EditPost
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Edit Your Post
          </h2>
          <form
            onSubmit={handleSubmit((values) =>
              mutate({
                postId,
                userData: { title: values.title, content: values.content! }
              })
            )}
            className="space-y-6"
          >
            <fieldset className="space-y-2">
              <label
                htmlFor="title"
                className="block text-lg font-semibold text-gray-700"
              >
                Post Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-red-500 focus:outline-none transition-colors"
                placeholder="What is your post called..."
                {...register("title")}
              />
            </fieldset>
            <fieldset className="space-y-2">
              <label
                htmlFor="content"
                className="block text-lg font-semibold text-gray-700"
              >
                What are you going to talk about?
              </label>
              <textarea
                id="content"
                className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-red-500 focus:outline-none transition-colors "
                placeholder="Start talking..."
                rows={8}
                {...register("content")}
              />
            </fieldset>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="button-secondary px-8 py-4 text-xl hover:bg-gray-300 hover:text-red-500 cursor-pointer"
              >
                Update Post
              </button>
            </div>
            {error && (
              <div className="mt-4 text-center">
                <div className="text-red-500 text-sm">{error.message}</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
