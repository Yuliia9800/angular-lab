import { createReducer, on } from '@ngrx/store';
import { CourseItem } from 'utils/public_api';

import { setCourses, setCourse, setCourseId } from './courses.actions';

export interface CoursesState {
  courses: CourseItem[];
  course: CourseItem | null;
  courseId: number | null;
}

export const initialState: CoursesState = {
  courses: [],
  course: null,
  courseId: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(setCourses, (state, { courses }): CoursesState => ({ ...state, courses })),
  on(setCourse, (state, { course }): CoursesState => ({ ...state, course })),
  on(setCourseId, (state, { id }): CoursesState => ({ ...state, courseId: id }))
);
