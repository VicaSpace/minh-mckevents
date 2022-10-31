import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  LoginPayload,
  RegisterUserPayload,
  loginUser,
  registerUser,
} from '@/lib/apis/auth';
import { KnownThunkError } from '@/states/store';
import { ThunkFetchState } from '@/states/thunk';

export interface AuthState {
  data: {
    status: {
      register: ThunkFetchState;
      login: ThunkFetchState;
    };
    isAuth: boolean;
  };
  error: null | string;
}

/**
 * Register User Action
 */
export const registerUserAction = createAsyncThunk<
  boolean,
  RegisterUserPayload,
  {
    rejectValue: KnownThunkError;
  }
>('auth/registerUserAction', async (payload, thunkApi) => {
  try {
    await registerUser(payload);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data as KnownThunkError);
    }
    return thunkApi.rejectWithValue({ message: (err as Error).message });
  }
  return true;
});

/**
 * Login User Action
 */
export const loginUserAction = createAsyncThunk<
  string | null,
  LoginPayload,
  {
    rejectValue: KnownThunkError;
  }
>('auth/loginUserAction', async (payload, thunkApi) => {
  let accessToken: string | null = null;
  try {
    const res = await loginUser(payload);
    console.log('res:', res);
    accessToken = res.accessToken;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data as KnownThunkError);
    }
    return thunkApi.rejectWithValue({ message: (err as Error).message });
  }
  return accessToken;
});

const initialState: AuthState = {
  data: {
    status: {
      register: ThunkFetchState.Idle,
      login: ThunkFetchState.Idle,
    },
    isAuth: false,
  },
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser(state) {
      state.data.isAuth = true;
    },
  },
  extraReducers(builder) {
    /// Register User action
    builder.addCase(registerUserAction.pending, (state) => {
      state.data.status.register = ThunkFetchState.Pending;
    });
    builder.addCase(registerUserAction.fulfilled, (state) => {
      state.data.status.register = ThunkFetchState.Fulfilled;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.data.status.register = ThunkFetchState.Rejected;
      state.error = action.error.message ?? 'Undefined Error';
    });
    /// Login User action
    builder.addCase(loginUserAction.pending, (state) => {
      state.data.status.login = ThunkFetchState.Pending;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.data.status.login = ThunkFetchState.Fulfilled;
      window.localStorage.setItem('accessToken', action.payload ?? '');
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.data.status.login = ThunkFetchState.Rejected;
      state.error = action.error.message ?? 'Undefined Error';
    });
  },
});

export const { authenticateUser } = authSlice.actions;

export default authSlice.reducer;
