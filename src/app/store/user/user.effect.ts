import { inject } from '@angular/core';
import { EMPTY, catchError, switchMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthenticationService } from 'services/authentication.service';
import { getUserInfo, login, logout, setUserInfo } from './user.actions';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthenticationService)) => {
    return actions$.pipe(
      ofType(login.type),
      switchMap((payload) =>
        authService.login(payload).pipe(
          tap((data) => localStorage.setItem('token', data.token)),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    );
  },
  { functional: true, dispatch: false }
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthenticationService)) => {
    return actions$.pipe(
      ofType(logout.type),
      tap(() => authService.logout())
    );
  },
  { functional: true, dispatch: false }
);

export const getUserInfoEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthenticationService)) => {
    return actions$.pipe(
      ofType(getUserInfo.type),
      switchMap(() =>
        authService.getUserInfo().pipe(
          map((data) => ({
            id: data.id,
            firstName: data.name.first,
            lastName: data.name.last,
          })),
          tap((user) => localStorage.setItem('user', JSON.stringify(user))),
          map((user) => setUserInfo({ user })),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    );
  },
  { functional: true }
);
