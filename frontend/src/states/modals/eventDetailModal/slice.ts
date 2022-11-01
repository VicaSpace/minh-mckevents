import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getEventDetail } from '@/lib/apis/event';
import { KnownThunkError } from '@/states/store';
import { ThunkFetchState } from '@/states/thunk';

interface EventDetailModalState {
  data: {
    isOpen: boolean;
    detail: any | null;
    statusDetail: ThunkFetchState;
  };
  error: null | string;
}

/**
 * Fetch upcoming events
 */
export const getEventDetailAction = createAsyncThunk<
  any,
  number,
  {
    rejectValue: KnownThunkError;
  }
>('event/getEventDetail', async (eventId, thunkApi) => {
  let eventDetail: any | undefined;
  try {
    eventDetail = await getEventDetail({ eventId });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data as KnownThunkError);
    }
    return thunkApi.rejectWithValue({ message: (err as Error).message });
  }
  return eventDetail;
});

const initialState: EventDetailModalState = {
  data: {
    isOpen: false,
    detail: null,
    statusDetail: ThunkFetchState.Idle,
  },
  error: null,
};

const eventDetailModalSlice = createSlice({
  name: 'eventDetailModal',
  initialState,
  reducers: {
    open(state) {
      state.data.isOpen = true;
    },
    close(state) {
      state.data.isOpen = false;
    },
  },
  extraReducers(builder) {
    /// Fetch Upcoming Events action
    builder.addCase(getEventDetailAction.pending, (state) => {
      state.data.statusDetail = ThunkFetchState.Pending;
    });
    builder.addCase(getEventDetailAction.fulfilled, (state, action) => {
      state.data.statusDetail = ThunkFetchState.Fulfilled;
      state.data.detail = action.payload;
    });
    builder.addCase(getEventDetailAction.rejected, (state, action) => {
      state.data.statusDetail = ThunkFetchState.Rejected;
      state.error = action.error.message ?? 'Undefined Error';
    });
  },
});

export const { open, close } = eventDetailModalSlice.actions;

export default eventDetailModalSlice.reducer;
