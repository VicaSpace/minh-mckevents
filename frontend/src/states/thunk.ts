export enum ThunkFetchState {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export type ThunkStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';
