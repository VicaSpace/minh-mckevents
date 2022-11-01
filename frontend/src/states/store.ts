import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authSlice from '@/states/auth/slice';
import counterSlice from '@/states/counter/slice';
import eventSlice from '@/states/event/slice';
import createEventModalSlice from '@/states/modals/createEventModal/slice';
import eventDetailModalSlice from '@/states/modals/eventDetailModal/slice';
import loginModalSlice from '@/states/modals/loginModal/slice';
import registerModalSlice from '@/states/modals/registerModal/slice';

/* Main Redux Global Store configurations */
export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    counterSlice,
    registerModalSlice,
    authSlice,
    loginModalSlice,
    eventSlice,
    createEventModalSlice,
    eventDetailModalSlice,
  },
});

/* Types for Hook and Thunk */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/* Error message type */
export interface KnownThunkError {
  message: string;
}
