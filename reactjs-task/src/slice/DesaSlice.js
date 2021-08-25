import { createSlice } from '@reduxjs/toolkit';

export const desaSlice = createSlice({
  name: 'data-daerah',
  initialState: {
    data: []
  },
  reducers: {
    addDataDaerah: (state, action) => {
      state.data.push(action.payload);
    }
  }
});

export const { addDataDaerah } = desaSlice.actions;
export default desaSlice.reducer;
