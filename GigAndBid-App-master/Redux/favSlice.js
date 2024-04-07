import {createSlice} from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'favourite',
  initialState: [],
  reducers: {
    addToFav: (state, action) => {
      const {_id} = action.payload;
      const existingItemIndex = state.findIndex(item => item._id === _id);
      if (existingItemIndex !== -1) {
        return;
      } else {
        state.push({...action.payload});
      }
    },

    removeFromFav: (state, action) => {
      const productId = action.payload;
      return state.filter(item => item._id !== productId);
    },
  },
});

export const {addToFav, removeFromFav} = favSlice.actions;
export default favSlice.reducer;
