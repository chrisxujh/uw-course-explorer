import { Action } from '@ngrx/store';

export const GET_SUBJECTS = '[Course Explorer] Get Subjects';
export const GET_COURSES_BY_SUBJECT =
  '[Course Explorer] Get Courses by Subject';
export const GET_COURSE_BY_SUBJECT_AND_ID =
  '[Course Explorer] Get Course by Id';
export const GET_SUBJECTS_SUCCESS = '[Course Explorer] Get Subjects Success';
export const GET_SUBJECTS_FAILURE = '[Course Explorer] Get Subjects Failure';
export const GET_COURSES_SUCCESS = '[Course Explorer] Get Courses Success';
export const GET_COURSES_FAILURE = '[Course Explorer] Get Courses Failure';

export class GetSubjects implements Action {
  readonly type = GET_SUBJECTS;
  constructor() {}
}

export class GetCoursesBySubject implements Action {
  readonly type = GET_COURSES_BY_SUBJECT;
  constructor(public subject: string) {}
}

export class GetCourseBySubjectAndId implements Action {
  readonly type = GET_COURSE_BY_SUBJECT_AND_ID;
  constructor(public payload: any) {}
}

export class GetSubjectsSuccess implements Action {
  readonly type = GET_SUBJECTS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetSubjectsFailure implements Action {
  readonly type = GET_SUBJECTS_FAILURE;
  constructor() {}
}

export class GetCoursesSuccess implements Action {
  readonly type = GET_COURSES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCoursesFailure implements Action {
  readonly type = GET_COURSES_FAILURE;
  constructor() {}
}

export type FindCoursesActions =
  | GetSubjects
  | GetCoursesBySubject
  | GetCourseBySubjectAndId
  | GetSubjectsSuccess
  | GetSubjectsFailure
  | GetCoursesSuccess
  | GetCoursesFailure;
