import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { getCartState } from "./cartSlice";

export default function CartList() {
  const { cart } = useSelector(getCartState);

  return (
    <div className="space-y-6">
      {cart.length > 0 ? (
        cart.map((c) => <CartItem key={c.id} cart={c} />)
      ) : (
        <h2>No Cart Found!</h2>
      )}
    </div>
  );
}
