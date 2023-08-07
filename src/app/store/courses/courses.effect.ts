import { inject } from '@angular/core';
import { EMPTY, catchError, exhaustMap, map, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  createCourse,
  deleteCourse,
  getCourseById,
  loadCourses,
  setCourse,
  setCourses,
  updateCourse,
} from './courses.actions';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';

export const loadCoursesEffect = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(loadCourses.type),
      exhaustMap((payload) =>
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
      exhaustMap((payload) =>
        coursesService.getItemById(payload.id).pipe(
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
      exhaustMap((payload) =>
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
      exhaustMap((payload) =>
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
      exhaustMap((payload) =>
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
