import axios from 'axios';

import config from '@/config';

export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

/**
 * Register a User
 * @returns Registered User
 */
export const registerUser = async (payload: RegisterUserPayload) => {
  const res = await axios.post(`${config.endpoint.auth}/api/auth/register`, {
    ...payload,
  });
  return res.data;
};

export interface LoginPayload {
  username: string;
  password: string;
}

/**
 * Login a User
 * @returns Registered User
 */
export const loginUser = async (payload: LoginPayload) => {
  const res = await axios.post(`${config.endpoint.auth}/api/auth/login`, {
    ...payload,
  });
  return res.data;
};

export interface VerifyPayload {
  accessToken: string;
}

export interface VerifyUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Login a User
 * @returns Registered User
 */
export const verifyUser = async (
  payload: VerifyPayload
): Promise<VerifyUser> => {
  const { accessToken } = payload;
  const res = await axios.get(
    `${config.endpoint.auth}/api/auth/verify?accessToken=${accessToken}`
  );
  return res.data;
};
