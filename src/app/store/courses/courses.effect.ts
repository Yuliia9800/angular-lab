import { inject } from '@angular/core';
import { EMPTY, catchError, switchMap, map, tap, filter } from 'rxjs';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { CoursesService } from 'services/courses.service';
import {
  createCourse,
  deleteCourse,
  getCourseById,
  loadCourses,
  setCourse,
  setCourseId,
  setCourses,
  updateCourse,
} from './courses.actions';
import { Store } from '@ngrx/store';
import { selectCourses } from 'store';

export const loadCoursesEffect = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(loadCourses.type),
      switchMap((payload) =>
        coursesService.getList(payload).pipe(
          map((courses) => setCourses({ courses })),
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

export const getCourseByIdEffect = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(getCourseById.type),
      switchMap(({ id }) =>
        coursesService.getItemById(id).pipe(
          map((course) => setCourse({ course })),
          catchError((error) => {
            router.navigate(['courses']);

            console.error(error);
            return EMPTY;
          })
        )
      )
    );
  },
  { functional: true }
);

export const createCourseEffect = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(createCourse.type),
      switchMap((payload) =>
        coursesService.createCourse(payload).pipe(
          tap(() => {
            router.navigate(['courses']);
          }),
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

export const updateCourseEffect = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(updateCourse.type),
      switchMap((payload) =>
        coursesService.updateItem(payload.id, payload.course).pipe(
          tap(() => {
            router.navigate(['courses']);
          }),
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

export const deleteCourseEffect = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(deleteCourse.type),
      switchMap((payload) =>
        coursesService.removeItem(payload).pipe(
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

export const setCourseIdEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(setCourseId.type),
      filter(({ id }) => Boolean(id)),
      concatLatestFrom(() => store.select(selectCourses)),
      map(([{ id }, course]) => {
        const selectedCourse = course.find((course) => course.id === id);

        if (selectedCourse) {
          store.dispatch(setCourse({ course: selectedCourse }));
        }
      })
    );
  },
  { functional: true, dispatch: false }
);
