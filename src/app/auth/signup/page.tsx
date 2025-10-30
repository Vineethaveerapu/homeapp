import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <div className="w-full max-w-lg mx-auto rounded-2xl p-4 sm:p-6 md:p-8 border">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <SignUpForm />
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-red-500" href="/auth/login">
            Log in here
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
