import { Author, Course } from 'utils/public_api';
import { createAction, props } from '@ngrx/store';

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<{ count?: number; sort?: string; textFragment?: string }>()
);

export const setCourses = createAction(
  '[Courses] Set Courses',
  props<{ courses: Course[] }>()
);

export const setCourse = createAction(
  '[Courses] Set Course',
  props<{ course: Course }>()
);

export const setCourseId = createAction(
  '[Courses] Set Course ID',
  props<{ id: number }>()
);

export const resetCourseId = createAction('[Courses] Reset Course ID');

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: Course }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ id: number; course: Course }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const getCourseById = createAction(
  '[Courses] Get Course By Id',
  props<{ id: number }>()
);

export const getAuthors = createAction('[Courses] Get Authors');
export const setAuthors = createAction(
  '[Courses] Set Authors',
  props<{ authors: Author[] }>()
);
