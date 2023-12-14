import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getCartState } from "../features/cart/cartSlice";

export default function Navbar() {
  const {cart} = useSelector(getCartState);
  console.log(cart);
  const totalCartItems = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <Link to="/">
          <img src="/public/logo.svg" alt="LWS" className="max-w-[140px]" />
        </Link>

        <div className="flex gap-4">
          <NavLink to="/" className="navHome" id="lws-home">
            Home
          </NavLink>
          <NavLink to="cart" className="navCart" id="lws-cart">
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart">{totalCartItems}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
