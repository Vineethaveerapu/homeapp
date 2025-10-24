"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema } from "../../../../actions/schemas";
import { Divide } from "lucide-react";
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

  const { mutate, error } = useMutation({
    mutationFn: createPost
  });

  return (
    <div className="border-1 rounded-xl p-4 w-[700px] mx-auto">
      <h2 className="font-bold text-3xl mb-4">Got something to say</h2>
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
        className="flex flex-col gap-4 mb-4"
      >
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="title"> Post Title</label>
          <input
            className="border-2 border-gray-700 rounded-2xl p-2"
            id="title"
            {...register("title")}
            placeholder=" What is your post called..."
          />
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="image"> Upload an Image</label>
          <input type="file" id="image" {...register("image")} />
          {errors.image && <ErrorMessage message={errors.image.message!} />}
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="content"> What are you going to talk about?</label>
          <textarea
            id="content"
            {...register("content")}
            placeholder="start talking... "
            className="border-2 border-gray-700 rounded-2xl p-2 w-full"
          />
        </fieldset>
        <button type="submit" className="button-secondary w-1/2 mx-auto">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
