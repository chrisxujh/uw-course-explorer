import { FindCoursesState } from './find-courses.state';
import { GetCourseScheduleState } from './get-course-schedule.state';
import { GetTermsState } from './get-terms.state';

export * from './find-courses.state';
export * from './get-course-schedule.state';
export * from './get-terms.state';

export interface StoreState {
  findCourses: FindCoursesState;
  getCourseSchedule: GetCourseScheduleState;
  getTerms: GetTermsState;
}
