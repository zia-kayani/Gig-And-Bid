import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favSlice from './favSlice';
import categorySlice from './categorySlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favSlice,
    category: categorySlice,
  },
});

export default store;
