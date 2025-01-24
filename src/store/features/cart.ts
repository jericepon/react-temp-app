import { CartItem } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  list: CartItem[];
};

const initialState: CartState = {
  list: []
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      if (state.list.some((item) => item.pizzaId === action.payload.id))
      {
        state.list = state.list.map((item) => {
          if (item.pizzaId === action.payload.id)
          {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
              totalPrice: item.unitPrice * (item.quantity + 1)
            };
          }
          return item;
        });
        return;
      }
      state.list.push({
        ...action.payload,
        totalPrice: action.payload.unitPrice * action.payload.quantity
      });
    },
    plusQuantity(state, action) {
      let item = state.list.filter((item: CartItem) => item.pizzaId === action.payload)[0];
      item.quantity += 1;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    minusQuantity(state, action) {
      let item = state.list.filter((item: CartItem) => item.pizzaId === action.payload)[0];
      item.quantity -= 1;
      item.totalPrice = item.totalPrice - item.unitPrice;

      if (item.quantity == 0)
      {
        cart.caseReducers.deleteItem(state, action);
      }
    },
    updateItem(state, action) {
    },
    deleteItem(state, action) {
      state.list = state.list.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.list = [];
    }
  },
});
export const { addItem, plusQuantity, minusQuantity, updateItem, deleteItem, clearCart } = cart.actions;
export default cart.reducer;