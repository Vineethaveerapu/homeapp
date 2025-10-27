"use client";
import { logIn } from "../../../../../actions/log-in";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "../../../../../actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(logInSchema)
  });

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: logIn
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex flex-col gap-4 mb-4"
      >
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="email"> Enter your Email</label>
          <input
            className="border-2 border-gray-700 rounded-2xl p-2"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="password"> Enter your Password</label>
          <input
            id="password"
            {...register("password")}
            placeholder=" Enter your Password"
            className="border-2 border-gray-700 rounded-2xl p-2"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </fieldset>
        <button type="submit" className="button-secondary w-1/2 mx-auto">
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {data?.error && <ErrorMessage message={data.error} />}
    </>
  );
};

export default LogInForm;
