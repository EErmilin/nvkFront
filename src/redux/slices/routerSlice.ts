import {createSlice} from '@reduxjs/toolkit';
import { RouterTypes } from '../types/RouterTypes';

const initialState: RouterTypes = {
  modalVisible: false
};

const routerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setModalVisible(state, action) {
      state.modalVisible = action.payload;
    },
  },

});

export const {
  setModalVisible
} = routerSlice.actions;
export default routerSlice.reducer;
