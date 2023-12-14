import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "./cartSlice";
import { decreaseProductQuantity, increaseProductQuantity } from "../products/productsSlice";

export default function CartItem({ cart }) {
  const {id, name, category, company, image, quantity, price, totalPrice } = cart;
  const dispatch = useDispatch();

  console.log(cart);
  
  function handleIncrease() {
    dispatch(increaseQuantity(id));
    dispatch(decreaseProductQuantity(id))
  }

  function handleDecrease() {
    dispatch(decreaseQuantity(id))
    dispatch(increaseProductQuantity(id))
  }

  function handleRemove() {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="cartCard">
      <div className="flex items-center col-span-6 space-x-6">
        <img className="lws-cartImage" src={image} alt={name} />
        <div className="space-y-2">
          <h4 className="lws-cartName">{name}</h4>
          <p className="lws-cartCategory">
            {category}, {company}
          </p>
          <p>
            BDT <span className="lws-cartPrice">{price}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
        <div className="flex items-center space-x-4">
          <button className="lws-incrementQuantity" onClick={handleIncrease}>
            <i className="text-lg fa-solid fa-plus"></i>
          </button>
          <span className="lws-cartQuantity">{quantity}</span>
          <button className="lws-decrementQuantity" onClick={handleDecrease}>
            <i className="text-lg fa-solid fa-minus"></i>
          </button>
        </div>
        <p className="text-lg font-bold">
          BDT <span className="lws-calculatedPrice">{totalPrice}</span>
        </p>
      </div>
      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
        <button className="lws-removeFromCart" onClick={handleRemove}>
          <i className="text-lg text-red-400 fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
