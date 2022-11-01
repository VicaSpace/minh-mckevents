import { createSlice } from '@reduxjs/toolkit';

interface CreateEventModalState {
  data: {
    isOpen: boolean;
  };
  error: null | string;
}

const initialState: CreateEventModalState = {
  data: {
    isOpen: false,
  },
  error: null,
};

const createEventModalSlice = createSlice({
  name: 'createEventModalSlice',
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

export const { open, close } = createEventModalSlice.actions;

export default createEventModalSlice.reducer;
