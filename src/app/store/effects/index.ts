import { GetCoursesEffects } from './get-courses.effect';
import { GetSchedulesEffects } from './get-schedules.effect';
import { GetTermsEffects } from './get-terms.effect';

export * from './get-courses.effect';
export * from './get-schedules.effect';
export * from './get-terms.effect';

export const effects: any[] = [
  GetCoursesEffects,
  GetSchedulesEffects,
  GetTermsEffects
];
