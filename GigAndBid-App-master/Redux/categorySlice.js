import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: 'All',
  reducers: {
    selectCategory: (state, action) => {
      return action.payload; // Set the selected category as the new state
    },
  },
});

export const {selectCategory} = categorySlice.actions;
export default categorySlice.reducer;
