import { User } from 'src/app/utils/public_api';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{ email: string | null; password: string | null }>()
);

export const setToken = createAction(
  '[User] Set Token',
  props<{ token: string }>()
);

export const logout = createAction('[User] Logout');

export const getUserInfo = createAction('[User] Get User Info');
export const setUserInfo = createAction(
  '[User] Set User Info',
  props<{ user: User }>()
);
