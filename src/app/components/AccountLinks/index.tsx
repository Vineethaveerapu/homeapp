import Link from "next/link";

const AccountLinks = () => {
  return (
    <div>
      <Link className="button-secondary" href="auth/login">
        Login
      </Link>
    </div>
  );
};

export default AccountLinks;
