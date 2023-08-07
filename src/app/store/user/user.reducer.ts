/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/utils/public_api';

import { logout, setUserInfo, setToken } from './user.actions';

export interface UserState {
  user: User | null;
  token: string;
}

export const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') as any) || null,
  token: localStorage.getItem('token') || '',
};

export const userReducer = createReducer(
  initialState,
  on(logout, () => ({ user: null, token: '' })),
  on(setUserInfo, (state, { user }) => ({ ...state, user })),
  on(setToken, (state, { token }) => ({ ...state, token }))
);
