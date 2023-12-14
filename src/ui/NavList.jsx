import { NavLink } from "react-router-dom";

export default function NavList() {
  return (
    <ul className="hidden md:flex items-center space-x-6">
      <NavLink
        className="font-semibold cursor-pointer"
        to="index.html"
        id="lws-bookStore"
      >
        <li>Book Store</li>
      </NavLink>
      <NavLink className="cursor-pointer" to="/books/new" id="lws-addBook">
        <li>Add Book</li>
      </NavLink>
    </ul>
  );
}
