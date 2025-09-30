import Link from "next/link";
import LogInForm from "./LogInForm";

const LogInPage = () => {
  return (
    <>
      <div className="border-1 rounded-2xl p-4 w-[700px] mx-auto">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <LogInForm />
        <div>
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
