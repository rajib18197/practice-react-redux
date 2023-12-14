import { Link, NavLink } from "react-router-dom";

const routes = [
  { endpoint: "all-available-jobs", label: "All Available Jobs", icon: "" },
  { endpoint: "internship", label: "Internship", icon: "" },
  { endpoint: "full-time", label: "Full Time", icon: "" },
  { endpoint: "remote", label: "Remote", icon: "" },
];

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="space-y-4">
        {routes.map((route) => (
          <li key={route.label}>
            <NavLink
              className="sub-menu"
              to={`/jobs/${route.endpoint}`}
              id={`lws-${route.endpoint}-menu`}
            >
              <i className="fa-solid fa-stop !text-[#FF5757]"></i>
              {route.label}
            </NavLink>
          </li>
        ))}

        <li>
          <Link to="/jobs/new" className="main-menu" id="lws-addJob-menu">
            <i className="fa-solid fa-file-circle-plus"></i>
            <span>Create New Job</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
