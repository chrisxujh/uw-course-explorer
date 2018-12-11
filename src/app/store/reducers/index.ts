import { ActionReducerMap } from '@ngrx/store';

import { GetCoursesReducer } from './get-courses.reducer';
import { GetSchedulesReducer } from './get-schedules.reducer';
import { GetTermsReducer } from './get-terms.reducer';

import * as fromState from '../states';

export * from './get-courses.reducer';
export * from './get-schedules.reducer';
export * from './get-terms.reducer';

export const reducers: ActionReducerMap<fromState.StoreState> = {
  getCourses: GetCoursesReducer,
  getSchedules: GetSchedulesReducer,
  getTerms: GetTermsReducer
};
