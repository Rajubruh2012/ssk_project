import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Reset State after logout
export const resettableRootReducer = (state, action) => {
//   console.log("action: ", action);
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const store = configureStore({
  reducer: resettableRootReducer,
});

export default store;
