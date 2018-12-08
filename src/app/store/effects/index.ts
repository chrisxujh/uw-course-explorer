import { FindCourseEffects } from './find-courses.effect';
import { GetCourseScheduleEffects } from './get-course-schedule.effect';
import { GetTermsEffects } from './get-terms.effect';

export * from './find-courses.effect';
export * from './get-course-schedule.effect';
export * from './get-terms.effect';

export const effects: any[] = [
  FindCourseEffects,
  GetCourseScheduleEffects,
  GetTermsEffects
];
