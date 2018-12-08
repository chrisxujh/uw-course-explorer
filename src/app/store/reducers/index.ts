import { ActionReducerMap } from '@ngrx/store';

import { FindCoursesReducer } from './find-courses.reducer';
import { GetCourseScheduleReducer } from './get-course-schedule.reducer';
import { GetTermsReducer } from './get-terms.reducer';

import * as fromState from '../states';

export * from './find-courses.reducer';
export * from './get-course-schedule.reducer';
export * from './get-terms.reducer';

export const reducers: ActionReducerMap<fromState.StoreState> = {
  findCourses: FindCoursesReducer,
  getCourseSchedule: GetCourseScheduleReducer,
  getTerms: GetTermsReducer
};
