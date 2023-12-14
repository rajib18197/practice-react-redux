import CartBills from "../features/cart/CartBills";
import CartList from "../features/cart/CartList";
import Main from "../ui/Main";

export default function Cart() {
  return (
    <Main>
      <div className="container 2xl:px-8 px-2 mx-auto">
        <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
        <div className="cartListContainer">
          <CartList />

          <CartBills />
        </div>
      </div>
    </Main>
  );
}
