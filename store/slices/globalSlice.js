import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateLoading(state, action) {
        state.loading = action.payload;
    }
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
