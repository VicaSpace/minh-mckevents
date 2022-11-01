import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { EventData } from '@/components/EventCardList';
import {
  CreateEventPayload,
  createEvent,
  getUpcomingEvents,
} from '@/lib/apis/event';
import { KnownThunkError } from '@/states/store';
import { ThunkFetchState } from '@/states/thunk';

export interface EventState {
  data: EventData;
  status: ThunkFetchState;
  createStatus: ThunkFetchState;
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

/**
 * Create an Event
 */
export const createEventAction = createAsyncThunk<
  any,
  CreateEventPayload,
  {
    rejectValue: KnownThunkError;
  }
>('event/createEventAction', async (payload, thunkApi) => {
  let createdEvent: any | undefined;
  try {
    createdEvent = await createEvent(payload);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data as KnownThunkError);
    }
    return thunkApi.rejectWithValue({ message: (err as Error).message });
  }
  return createdEvent;
});

const initialState: EventState = {
  data: [],
  status: ThunkFetchState.Idle,
  createStatus: ThunkFetchState.Idle,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    /// Fetch Upcoming Events action
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
    /// Create Event action
    builder.addCase(createEventAction.pending, (state) => {
      state.createStatus = ThunkFetchState.Pending;
    });
    builder.addCase(createEventAction.fulfilled, (state, action) => {
      state.createStatus = ThunkFetchState.Fulfilled;
      console.log('created event:', action);
    });
    builder.addCase(createEventAction.rejected, (state, action) => {
      state.createStatus = ThunkFetchState.Rejected;
      state.error = action.error.message ?? 'Undefined Error';
    });
  },
});

export const { setData } = eventSlice.actions;

export default eventSlice.reducer;
