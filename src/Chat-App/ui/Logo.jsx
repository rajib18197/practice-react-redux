import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img
        className="mx-auto h-12 w-auto"
        src="/public/logo.svg"
        alt="Learn with sumit"
      />
    </Link>
  );
}
