import Logo from "./Logo";
import NavList from "./NavList";
import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <Logo />
        <NavList />
        <SearchBox />
      </div>
    </nav>
  );
}
