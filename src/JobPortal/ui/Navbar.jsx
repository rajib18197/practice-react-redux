import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h2>JOB PORTAL</h2>
      <div>
        <h2>User Name</h2>
      </div>
      <div>
        <button>Dark Mode</button>
      </div>
      <ul>
        <Link>
          <li>Update User</li>
        </Link>
        <Link>Logout</Link>
      </ul>
    </nav>
  );
}
