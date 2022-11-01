import axios from 'axios';

import config from '@/config';

interface GetUserDetailPayload {
  userId: number;
}

/**
 * Get User Detail
 * @param payload Payload
 * @returns User Detail
 */
export const getUserDetail = async (payload: GetUserDetailPayload) => {
  const { userId } = payload;
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Unauthenticated call made to API.');
  }
  const res = await axios.get(`${config.endpoint.auth}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
