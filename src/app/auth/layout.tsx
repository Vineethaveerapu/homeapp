import Logo from "../components/Logo";
const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <header className="flex justify-between items-center flex-wrap ">
        <Logo />
      </header>
      <div className="w-[80%] m-auto">{children}</div>
    </>
  );
};

export default AuthLayout;
