import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.username = action.payload;
    }
  },
});
export const { updateUserName } = user.actions;
export default user.reducer;