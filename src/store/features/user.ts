import { getAddress } from "@/lib/helpers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  address: "",
  loading: false,
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const getLocation = createAsyncThunk('user/getGetLocation', async () => {
  const posObj = await getPosition() as GeolocationPosition;
  const position = {
    latitude: posObj.coords.latitude,
    longitude: posObj.coords.longitude
  }
  const response = await getAddress(position);
  return response;
});

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => {
      state.loading = true;
    }).addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.address = `${action.payload?.locality}, ${action.payload?.city} ${action.payload?.countryName}`;
    });;
  }
});


export const { updateUserName } = user.actions;
export default user.reducer;