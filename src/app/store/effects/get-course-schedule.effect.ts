import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
        .getCourseSchedule(action.payload.subject, action.payload.catalogNumber)
        .pipe(
          map(schedule => new fromAction.GetCourseScheduleSuccess(schedule))
        )
    )
  );
}
