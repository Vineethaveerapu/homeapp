"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema } from "../../../../actions/schemas";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../../actions/create-post";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

const CreatePage = () => {
  const schemaWithImage = postSchema.omit({ image: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schemaWithImage)
  });

  const { mutate } = useMutation({
    mutationFn: createPost
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Got something to say?
          </h2>
          <form
            onSubmit={handleSubmit((values) => {
              const imageForm = new FormData();
              if (values.image) imageForm.append("image", values.image[0]);
              mutate({
                title: values.title,
                content: values.content,
                image: imageForm
              });
            })}
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
                className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-red-500 focus:outline-none transition-colors"
                id="title"
                {...register("title")}
                placeholder="What is your post called..."
              />
              {errors.title && <ErrorMessage message={errors.title.message!} />}
            </fieldset>

            <fieldset className="space-y-2">
              <label
                htmlFor="image"
                className="block text-lg font-semibold text-gray-700"
              >
                Upload an Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  {...register("image")}
                  className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg  cursor-pointer transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
                  accept="image/*"
                />
              </div>
              {errors.image && <ErrorMessage message={errors.image.message!} />}
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
                {...register("content")}
                placeholder="Start talking..."
                rows={8}
                className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-red-500 focus:outline-none transition-colors resize-vertical"
              />
              {errors.content && (
                <ErrorMessage message={errors.content.message!} />
              )}
            </fieldset>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="button-secondary px-8 py-4 text-xl hover:bg-gray-300  hover:text-red-500 cursor-pointer"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
