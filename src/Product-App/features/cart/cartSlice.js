import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartIndex = state.cart.findIndex((c) => c.id === action.payload.id);

      if (cartIndex !== -1) {
        state.cart[cartIndex].quantity = state.cart[cartIndex].quantity + 1;
        state.cart[cartIndex].totalPrice =
          state.cart[cartIndex].totalPrice + action.payload.price;
      } else {
        state.cart.push({
          ...action.payload,
          totalPrice: action.payload.price,
        });
      }
    },

    increaseQuantity(state, action) {
      const indexToIncrease = state.cart.findIndex(
        (c) => c.id === action.payload
      );
      state.cart[indexToIncrease].quantity =
        state.cart[indexToIncrease].quantity + 1;

      state.cart[indexToIncrease].totalPrice =
        state.cart[indexToIncrease].totalPrice +
        state.cart[indexToIncrease].price;
    },

    decreaseQuantity(state, action) {
      const indexToDecrease = state.cart.findIndex(
        (c) => c.id === action.payload
      );
      state.cart[indexToDecrease] = {
        ...state.cart[indexToDecrease],
        quantity: state.cart[indexToDecrease].quantity - 1,
        totalPrice:
          state.cart[indexToDecrease].totalPrice -
          state.cart[indexToDecrease].price,
      };
    },

    removeFromCart(state, action) {
      const indexToRemove = state.cart.findIndex(
        (c) => c.id === action.payload
      );
      state.cart.splice(indexToRemove, 1);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCartState = (state) => state.cart;
