import { ActionReducerMap } from '@ngrx/store';

import * as fromState from '../states';
import { FindCoursesReducer } from './find-courses.reducer';
import { GetCourseScheduleReducer } from './get-course-schedule.reducer';

export * from './find-courses.reducer';
export * from './get-course-schedule.reducer';

export const reducers: ActionReducerMap<fromState.StoreState> = {
  findCourses: FindCoursesReducer,
  getCourseSchedule: GetCourseScheduleReducer
};
