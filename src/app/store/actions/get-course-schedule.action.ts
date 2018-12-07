import { Action } from '@ngrx/store';

export const GET_COURSE_SCHEDULE = '[Course Explorer] Get Course Schedule';
export const GET_COURSE_EXAM_SCHEDULE =
  '[Course Explorer] Get Course Exam Schedule';
export const GET_COURSE_SCHEDULE_SUCCESS =
  '[Course Explorer] Get Course Schedule Success';
export const GET_COURSE_SCHEDULE_FAILURE =
  '[Course Explorer] Get Course Schedule Failure';

export class GetCourseSchedule implements Action {
  readonly type = GET_COURSE_SCHEDULE;
  constructor(public payload: any) {}
}

export class GetCourseExamSchedule implements Action {
  readonly type = GET_COURSE_EXAM_SCHEDULE;
  constructor(public payload: any) {}
}

export class GetCourseScheduleSuccess implements Action {
  readonly type = GET_COURSE_SCHEDULE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCourseScheduleFailure implements Action {
  readonly type = GET_COURSE_SCHEDULE_FAILURE;
  constructor() {}
}

export type GetCourseScheduleActions =
  | GetCourseSchedule
  | GetCourseExamSchedule
  | GetCourseScheduleSuccess
  | GetCourseScheduleFailure;
