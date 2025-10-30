import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="bg-red-500 text-white px-6 py-2 text-2xl font-semibold rounded-2xl max-w-fit"
    >
      Blogsy
    </Link>
  );
};

export default Logo;
