import { FindCourseEffects } from './find-courses.effect';
import { GetCourseScheduleEffects } from './get-course-schedule.effect';

export * from './find-courses.effect';
export * from './get-course-schedule.effect';

export const effects: any[] = [FindCourseEffects, GetCourseScheduleEffects];
