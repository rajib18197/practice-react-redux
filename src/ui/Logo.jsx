import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={'/books'}>
      <img src="/public/logo.svg" width="150px" className="object-contain" />
    </Link>
  );
}
