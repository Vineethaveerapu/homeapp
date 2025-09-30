import Logo from "../Logo";
import AccountLinks from "../AccountLinks";
import SearchInput from "../Search";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center ">
        <Logo />
        <SearchInput />
        <AccountLinks />
      </header>
      <div className="mt-4 mx-auto w-[80%] border-b-3 border-gray-700 pb-4"></div>
    </>
  );
};

export default Header;
