import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartId: 0,
  addedToCartData: {
    userId: 0,
    products: []
  },
  addToCartPending: false,
  cartList: [],
  loading: true,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartList: (state, action) => {
      state.cartList = action.payload;
    }
  },
});
export const { updateCartList } = cart.actions;
export default cart.reducer;