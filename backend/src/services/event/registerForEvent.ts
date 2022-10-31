interface RegisterForEventPayload {
  // eventId from path params
  // votes
  timeSlotVotes: string[]; // List of timeSlotId
}

export const registerForEvent = (payload: RegisterForEventPayload) => {
  const { timeSlotVotes } = payload;
};
