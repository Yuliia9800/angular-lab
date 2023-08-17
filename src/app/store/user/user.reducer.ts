/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { User } from 'utils/public_api';

import { logout, setUserInfo } from './user.actions';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') as any) || null,
};

export const userReducer = createReducer(
  initialState,
  on(logout, () => ({ user: null, token: '' })),
  on(setUserInfo, (state, { user }) => ({ ...state, user }))
);
