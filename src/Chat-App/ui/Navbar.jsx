import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

export default function Navbar() {
  const {user: {name}} = useUser();
  // console.log(user);
  const navigate = useNavigate();

  function handleClick(){
    localStorage.clear(); 
    navigate('/login')
  }

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <img className="h-10" src='/public/logo.svg' alt="Learn with Sumit" />
          </Link>
          <ul className="flex gap-4">  
            <li className="text-white">
              <span onClick={handleClick}>Logout</span>
            </li>
            <span className="text-stone-100 font-bold">{name.split(' ')[0]}</span>
          </ul>
        </div>
      </div>
    </nav>
  );
}
