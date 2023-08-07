import { createSelector } from '@ngrx/store';
import { CoursesState } from './courses/courses.reducer';
import { UserState } from './user/user.reducer';

export interface AppState {
  courses: CoursesState;
  user: UserState;
}

const selectCoursesState = (state: AppState) => state.courses;

export const selectCourses = createSelector(
  selectCoursesState,
  (state) => state.courses
);

export const selectCourse = createSelector(
  selectCoursesState,
  (state) => state.course
);

export const selectCourseName = createSelector(
  selectCoursesState,
  (state) => state.course?.name
);

export const selectToken = (state: AppState) => state.user.token;
export const selectUserName = (state: AppState) =>
  state.user.user?.firstName || '';
