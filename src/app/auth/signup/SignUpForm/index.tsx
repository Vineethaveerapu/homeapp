"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp } from "../../../../../actions/sign-up";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../../../../actions/schemas";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/app/components/ErrorMessage";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const { mutate, error } = useMutation({
    mutationFn: SignUp
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
            type="email"
            required
            placeholder="Enter your Email"
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="username"> Enter your Username</label>
          <input
            id="username"
            type="text"
            required
            {...register("username")}
            placeholder=" Enter your Username"
            className="border-2 border-gray-700 rounded-2xl p-2"
          />
          {errors.username && (
            <ErrorMessage message={errors.username.message!} />
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="password"> Enter your Password</label>
          <input
            id="password"
            {...register("password")}
            required
            placeholder=" Enter your Password"
            className="border-2 border-gray-700 rounded-2xl p-2"
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </fieldset>

        <button type="submit" className="button-secondary w-1/2 mx-auto">
          Sign Up
        </button>
        {error && <ErrorMessage message={error.message} />}
      </form>
    </>
  );
};

export default SignUpForm;
