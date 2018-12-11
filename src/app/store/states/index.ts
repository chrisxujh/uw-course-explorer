import { GetCoursesState } from './get-courses.state';
import { GetSchedulesState } from './get-schedules.state';
import { GetTermsState } from './get-terms.state';

export * from './get-courses.state';
export * from './get-schedules.state';
export * from './get-terms.state';

export interface StoreState {
  getCourses: GetCoursesState;
  getSchedules: GetSchedulesState;
  getTerms: GetTermsState;
}
