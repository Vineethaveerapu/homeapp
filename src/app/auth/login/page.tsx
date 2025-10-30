import Link from "next/link";
import LogInForm from "./LogInForm";

const LogInPage = () => {
  return (
    <>
      <div className="w-full max-w-lg mx-auto rounded-2xl p-4 sm:p-6 md:p-8 border">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <LogInForm />
        <div className="mt-4 text-center">
          Don&apos;t have an account? Sign up{" "}
          <Link className="text-red-500" href="/auth/signup">
            here
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
