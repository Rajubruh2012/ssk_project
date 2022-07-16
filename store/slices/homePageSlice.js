import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displaySlideMenu: false,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    updateSlideMenu(state, action) {
        state.displaySlideMenu = action.payload;
    },
  },
});

export const homePageActions = homePageSlice.actions;
export default homePageSlice.reducer;
