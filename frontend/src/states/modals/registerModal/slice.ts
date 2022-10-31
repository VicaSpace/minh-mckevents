import { createSlice } from '@reduxjs/toolkit';

interface RegisterModalState {
  data: {
    isOpen: boolean;
  };
  error: null | string;
}

const initialState: RegisterModalState = {
  data: {
    isOpen: false,
  },
  error: null,
};

const registerModalSlice = createSlice({
  name: 'registerModalSlice',
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

export const { open, close } = registerModalSlice.actions;

export default registerModalSlice.reducer;
