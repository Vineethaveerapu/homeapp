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
            type="email"
            inputMode="email"
            autoComplete="email"
            {...register("email")}
            placeholder="Email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password"> Enter your Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            placeholder=" Enter your Password"
            className="w-full border-2 border-gray-700 rounded-2xl p-2"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </fieldset>
        <button
          type="submit"
          className="button-secondary w-auto mx-auto"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {data?.error && <ErrorMessage message={data.error} />}
    </div>
  );
};

export default LogInForm;
