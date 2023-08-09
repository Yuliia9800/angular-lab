import { CourseItem } from 'utils/public_api';
import { createAction, props } from '@ngrx/store';

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<{ count?: number; sort?: string; textFragment?: string }>()
);

export const setCourses = createAction(
  '[Courses] Set Courses',
  props<{ courses: CourseItem[] }>()
);

export const setCourse = createAction(
  '[Courses] Set Course',
  props<{ course: CourseItem }>()
);

export const setCourseId = createAction(
  '[Courses] Set Course ID',
  props<{ id: number }>()
);

export const resetCourseId = createAction('[Courses] Reset Course ID');

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: CourseItem }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ id: number; course: CourseItem }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const getCourseById = createAction(
  '[Courses] Get Course By Id',
  props<{ id: number }>()
);
