import { Action } from '@ngrx/store';

export const GET_SUBJECTS = '[Get Courses] Get Subjects';
export const GET_COURSES = '[Get Courses] Get Courses';
export const GET_COURSE_BY_ID = '[Get Courses] Get Course by Id';
export const GET_COURSES_BY_SUBJECT = '[Get Courses] Get Courses by Subject';
export const GET_SUBJECTS_SUCCESS = '[Get Courses] Get Subjects Success';
export const GET_SUBJECTS_FAILURE = '[Get Courses] Get Subjects Failure';
export const GET_COURSES_SUCCESS = '[Get Courses] Get Courses Success';
export const GET_COURSES_FAILURE = '[Get Courses] Get Courses Failure';

export class GetSubjects implements Action {
  readonly type = GET_SUBJECTS;
  constructor() {}
}

export class GetCourses implements Action {
  readonly type = GET_COURSES;
  constructor() {}
}

export class GetCourseById implements Action {
  readonly type = GET_COURSE_BY_ID;
  constructor(public payload: any) {}
}

export class GetCoursesBySubject implements Action {
  readonly type = GET_COURSES_BY_SUBJECT;
  constructor(public subject: string) {}
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

export type GetCoursesActions =
  | GetSubjects
  | GetCourses
  | GetCourseById
  | GetCoursesBySubject
  | GetSubjectsSuccess
  | GetSubjectsFailure
  | GetCoursesSuccess
  | GetCoursesFailure;
