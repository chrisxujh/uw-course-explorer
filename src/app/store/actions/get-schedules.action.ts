import { Action } from '@ngrx/store';

export const GET_COURSE_SCHEDULE = '[Get Schedules] Get Course Schedule';
export const GET_COURSE_EXAM_SCHEDULE =
  '[Get Schedules] Get Course Exam Schedule';
export const GET_SCHEDULES_SUCCESS = '[Get Schedules] Get Schedule Success';
export const GET_SCHEDULES_FAILURE = '[Get Schedules] Get Schedule Failure';

export class GetCourseSchedule implements Action {
  readonly type = GET_COURSE_SCHEDULE;
  constructor(public payload: any) {}
}

export class GetCourseExamSchedule implements Action {
  readonly type = GET_COURSE_EXAM_SCHEDULE;
  constructor(public payload: any) {}
}

export class GetSchedulesSuccess implements Action {
  readonly type = GET_SCHEDULES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetSchedulesFailure implements Action {
  readonly type = GET_SCHEDULES_FAILURE;
  constructor() {}
}

export type GetSchedulesActions =
  | GetCourseSchedule
  | GetCourseExamSchedule
  | GetSchedulesSuccess
  | GetSchedulesFailure;
