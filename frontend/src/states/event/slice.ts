import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { EventData } from '@/components/EventCardList';
import { getUpcomingEvents } from '@/lib/apis/event';
import { KnownThunkError } from '@/states/store';
import { ThunkFetchState } from '@/states/thunk';

export interface EventState {
  data: EventData;
  status: ThunkFetchState;
  error: null | string;
}

/**
 * Fetch upcoming events
 */
export const fetchUpcomingEvents = createAsyncThunk<
  EventData,
  undefined,
  {
    rejectValue: KnownThunkError;
  }
>('event/getUpcomingEvents', async (_, thunkApi) => {
  let upcomingEvents: EventData = [];
  try {
    upcomingEvents = await getUpcomingEvents();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data as KnownThunkError);
    }
    return thunkApi.rejectWithValue({ message: (err as Error).message });
  }
  return upcomingEvents;
});

const initialState: EventState = {
  data: [],
  status: ThunkFetchState.Idle,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /// Login User action
    builder.addCase(fetchUpcomingEvents.pending, (state) => {
      state.status = ThunkFetchState.Pending;
    });
    builder.addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
      state.status = ThunkFetchState.Fulfilled;
      state.data = action.payload;
    });
    builder.addCase(fetchUpcomingEvents.rejected, (state, action) => {
      state.status = ThunkFetchState.Rejected;
      state.error = action.error.message ?? 'Undefined Error';
    });
  },
});

// export const {} = authSlice.actions;

export default eventSlice.reducer;
