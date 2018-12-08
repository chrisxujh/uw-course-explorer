import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { UwDataService } from '../../services/uw-data.service';

import * as fromAction from '../actions';

@Injectable()
export class GetCourseScheduleEffects {
  constructor(
    private actions$: Actions,
    private uwDataService: UwDataService
  ) {}

  @Effect()
  getCourseSchedule$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.GET_COURSE_SCHEDULE),
    switchMap((action: any) =>
      this.uwDataService
        .getCourseSchedule(
          action.payload.termId,
          action.payload.subject,
          action.payload.catalogNumber
        )
        .pipe(
          map(schedule => new fromAction.GetCourseScheduleSuccess(schedule)),
          catchError(() => of(new fromAction.GetCourseScheduleFailure()))
        )
    )
  );

  @Effect()
  getCourseExamSchedule$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.GET_COURSE_EXAM_SCHEDULE),
    switchMap((action: any) =>
      this.uwDataService
        .getCourseExamSchedule(
          action.payload.subject,
          action.payload.catalogNumber
        )
        .pipe(
          map(schedule => new fromAction.GetCourseScheduleSuccess(schedule)),
          catchError(() => of(new fromAction.GetCourseScheduleFailure()))
        )
    )
  );
}
