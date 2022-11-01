import axios from 'axios';

import config from '@/config';

/**
 * Get Upcoming Events
 * @returns Upcoming Events
 */
export const getUpcomingEvents = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Unauthenticated call made to API.');
  }
  const res = await axios.get(
    `${config.endpoint.backend}/api/events/upcoming`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export interface CreateEventPayload {
  name: string;
  description: string;
  date: Date;
  office: string;
  duration?: number;
  timeStart: Date;
  location: string;
  minParticipants: number;
}

/**
 * Create an Event
 * @param payload Payload
 * @returns Created Event
 */
export const createEvent = async (payload: CreateEventPayload) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Unauthenticated call made to API.');
  }
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await axios.post(
    `${config.endpoint.backend}/api/events`,
    {
      ...payload,
    },
    axiosConfig
  );
  return res.data;
};

interface GetEventDetailPayload {
  eventId: number;
}
/**
 * Get Event Detail
 * @returns Upcoming Events
 */
export const getEventDetail = async (payload: GetEventDetailPayload) => {
  const { eventId } = payload;
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Unauthenticated call made to API.');
  }
  const res = await axios.get(
    `${config.endpoint.backend}/api/events/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
