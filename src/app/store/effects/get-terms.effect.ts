import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { UwDataService } from '../../services/uw-data.service';

import * as fromAction from '../actions';

@Injectable()
export class GetTermsEffects {
  constructor(
    private actions$: Actions,
    private uwDataService: UwDataService
  ) {}

  @Effect()
  getTerms$: Observable<any> = this.actions$.pipe(
    ofType(fromAction.GET_TERMS),
    switchMap(() =>
      this.uwDataService.getTermsInfo().pipe(
        map(data => new fromAction.GetTermsSuccess(data)),
        catchError(() => of(new fromAction.GetTerms()))
      )
    )
  );
}
