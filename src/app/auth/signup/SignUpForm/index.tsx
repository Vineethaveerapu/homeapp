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
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex flex-col gap-4 mb-4"
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email"> Enter your Email</label>
          <input
            className="w-full border-2 border-gray-700 rounded-2xl p-2"
            id="email"
            {...register("email")}
            type="email"
            required
            placeholder="Enter your Email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="username"> Enter your Username</label>
          <input
            id="username"
            type="text"
            required
            {...register("username")}
            placeholder=" Enter your Username"
            className="w-full border-2 border-gray-700 rounded-2xl p-2"
            autoComplete="username"
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <ErrorMessage message={errors.username.message!} />
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password"> Enter your Password</label>
          <input
            id="password"
            {...register("password")}
            required
            placeholder=" Enter your Password"
            className="w-full border-2 border-gray-700 rounded-2xl p-2"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </fieldset>

        <button type="submit" className="button-secondary w-auto mx-auto">
          Sign Up
        </button>
        {error && <ErrorMessage message={error.message} />}
      </form>
    </div>
  );
};

export default SignUpForm;
