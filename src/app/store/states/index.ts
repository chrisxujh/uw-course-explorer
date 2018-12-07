import { FindCoursesState } from './find-courses.state';
import { GetCourseScheduleState } from './get-course-schedule.state';

export * from './find-courses.state';
export * from './get-course-schedule.state';

export interface StoreState {
  findCourses: FindCoursesState;
  getCourseSchedule: GetCourseScheduleState;
}
