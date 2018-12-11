import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromState from '../states';

export const getSchedulesStateSelector: MemoizedSelector<
  any,
  fromState.GetSchedulesState
> = createFeatureSelector<fromState.GetSchedulesState>('getSchedules');

export const getSchedulesEntitiesSelector: MemoizedSelector<
  fromState.StoreState,
  any
> = createSelector(
  getSchedulesStateSelector,
  fromState.getGetSchedulesEntities
);

export const getSchedulesLoadingSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getSchedulesStateSelector,
  fromState.getGetSchedulesLoading
);

export const getSchedulesErrorSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getSchedulesStateSelector,
  fromState.getGetSchedulesError
);
