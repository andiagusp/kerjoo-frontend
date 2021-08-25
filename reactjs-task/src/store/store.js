import { configureStore } from '@reduxjs/toolkit';
import desaReducer from '../slice/DesaSlice';

export default configureStore({
  reducer: {
    dataDaerahSave: desaReducer
  }
});
