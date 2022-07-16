import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRegisterData: { email: "", password: "", name: "" },
  userLoginData: { email: "", password: "" },
  userLoggedStatus: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateRegisterUserData(state, action) {
      const { name, value } = action.payload;
      state.userRegisterData[name] = value;
    },
    updateLoginUserData(state, action) {
      const { name, value } = action.payload;
      state.userLoginData[name] = value;
    },
    updateUserLoggedStatus(state, action) {
      state.userLoggedStatus = action.payload;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
