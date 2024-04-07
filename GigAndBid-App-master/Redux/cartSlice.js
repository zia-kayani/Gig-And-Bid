import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const {_id} = action.payload;
      const existingItemIndex = state.findIndex(item => item._id === _id);

      if (existingItemIndex !== -1) {
        // Increase the quantity of the existing item
        state[existingItemIndex].quantity += 1;
      } else {
        // Add the new item to the cart
        state.push({...action.payload, quantity: 1});
      }
    },
    decreaseQuantity: (state, action) => {
      const {_id} = action.payload;
      const existingItemIndex = state.findIndex(item => item._id === _id);

      if (existingItemIndex !== -1) {
        // Decrease the quantity of the existing item
        if (state[existingItemIndex].quantity > 1) {
          state[existingItemIndex].quantity -= 1;
        } else {
          // Remove the item from the cart if quantity is 1
          state.splice(existingItemIndex, 1);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const {_id} = action.payload;
      const existingItemIndex = state.findIndex(item => item._id === _id);

      if (existingItemIndex !== -1) {
        // Increase the quantity of the existing item
        state[existingItemIndex].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      return state.filter(item => item._id !== productId);
    },
    clearCart: state => {
      return [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
