import Logo from "../Logo";
import AccountLinks from "../AccountLinks";
import SearchInput from "../Search";

const Header = () => {
  return (
    <>
      <header className="flex flex-col gap-4 px-2 md:flex-row md:justify-between md:items-center md:px-0">
        <Logo />
        <SearchInput />
        <AccountLinks />
      </header>
      <div className="mt-4 mx-auto w-[80%] max-w-full border-b-3 border-gray-700 pb-4"></div>
    </>
  );
};

export default Header;
