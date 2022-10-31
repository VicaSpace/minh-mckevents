import { createSlice } from '@reduxjs/toolkit';

interface LoginModalState {
  data: {
    isOpen: boolean;
  };
  error: null | string;
}

const initialState: LoginModalState = {
  data: {
    isOpen: false,
  },
  error: null,
};

const loginModalSlice = createSlice({
  name: 'loginModalSlice',
  initialState,
  reducers: {
    open(state) {
      state.data.isOpen = true;
    },
    close(state) {
      state.data.isOpen = false;
    },
  },
});

export const { open, close } = loginModalSlice.actions;

export default loginModalSlice.reducer;
