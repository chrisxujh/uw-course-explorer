import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromState from '../states';

export const getCoursesStateSelector: MemoizedSelector<
  any,
  fromState.GetCoursesState
> = createFeatureSelector<fromState.GetCoursesState>('getCourses');

export const getCoursesEntitiesSelector: MemoizedSelector<
  fromState.StoreState,
  any
> = createSelector(
  getCoursesStateSelector,
  fromState.getGetCoursesEntities
);

export const getCoursesLoadingSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getCoursesStateSelector,
  fromState.getGetCoursesLoading
);

export const getCoursesErrorSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getCoursesStateSelector,
  fromState.getGetCoursesError
);
