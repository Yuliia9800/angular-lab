import { createReducer, on } from '@ngrx/store';
import { CourseItem } from 'utils/public_api';

import { setCourses, setCourse } from './courses.actions';

export interface CoursesState {
  courses: CourseItem[];
  course: CourseItem | null;
}

export const initialState: CoursesState = {
  courses: [],
  course: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(setCourses, (state, { courses }): CoursesState => ({ ...state, courses })),
  on(setCourse, (state, { course }): CoursesState => ({ ...state, course }))

  // on(actions.awayScore, (state) => ({
  //   ...state,
  //   away: state.away + 1,
  // })),
  // on(actions.resetScore, (state) => ({ home: 0, away: 0 })),
  // on(actions.setScores, (state, { game }) => ({
  //   home: game.home,
  //   away: game.away,
  // }))
);
