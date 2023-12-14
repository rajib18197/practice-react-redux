import { Link } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav class="container relative py-3">
      <div class="flex items-center justify-between">
        <Link to="/">
          <img src="/public/logo-task.svg" />
        </Link>
        <Search />
      </div>
    </nav>
  );
}
