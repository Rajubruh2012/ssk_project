import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from "../slices/globalSlice";
import userReducer from "../slices/userSlice";
import homePageReducer from "../slices/homePageSlice";

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  homePage: homePageReducer,
});

export default rootReducer;
