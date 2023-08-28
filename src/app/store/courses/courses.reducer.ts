import { createReducer, on } from '@ngrx/store';
import { Author, Course } from 'utils/public_api';

import {
  setCourses,
  setCourse,
  setCourseId,
  setAuthors,
} from './courses.actions';

export interface CoursesState {
  courses: Course[];
  course: Course | null;
  courseId: number | null;
  authors: Author[];
}

export const initialState: CoursesState = {
  courses: [],
  authors: [],
  course: null,
  courseId: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(setCourses, (state, { courses }): CoursesState => ({ ...state, courses })),
  on(setCourse, (state, { course }): CoursesState => ({ ...state, course })),
  on(
    setCourseId,
    (state, { id }): CoursesState => ({ ...state, courseId: id })
  ),
  on(setAuthors, (state, { authors }): CoursesState => ({ ...state, authors }))
);
