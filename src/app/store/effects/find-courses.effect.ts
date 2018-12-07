import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UwDataService } from '../../services/uw-data.service';

import * as fromAction from '../actions';

@Injectable()
export class FindCourseEffects {
  constructor(
    private actions$: Actions,
    private uwDataService: UwDataService
  ) {}

  @Effect()
  getSubjects$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.GET_SUBJECTS),
    switchMap(() =>
      this.uwDataService
        .getSubjects()
        .pipe(map(subjects => new fromAction.GetSubjectsSuccess(subjects)))
    )
  );

  @Effect()
  getCoursesBySubject$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.GET_COURSES_BY_SUBJECT),
    switchMap((action: any) =>
      this.uwDataService
        .getCoursesBySubject(action.subject)
        .pipe(map(courses => new fromAction.GetCoursesSuccess(courses)))
    )
  );

  @Effect()
  getCourseById$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.GET_COURSE_BY_SUBJECT_AND_ID),
    switchMap((action: any) =>
      this.uwDataService.getCourseByCourseId(action.payload.courseId).pipe(
        map(course => {
          return course.subject === action.payload.subject
            ? new fromAction.GetCoursesSuccess(course)
            : new fromAction.GetCoursesFailure();
        })
      )
    )
  );
}
