import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromState from '../states';

export const findCoursesStateSelector: MemoizedSelector<
  any,
  fromState.FindCoursesState
> = createFeatureSelector<fromState.FindCoursesState>('findCourses');

export const findCoursesEntitiesSelector: MemoizedSelector<
  fromState.StoreState,
  any
> = createSelector(
  findCoursesStateSelector,
  fromState.getFindCoursesEntities
);

export const findCoursesLoadingSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  findCoursesStateSelector,
  fromState.getFindCoursesLoading
);

export const findCoursesErrorSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  findCoursesStateSelector,
  fromState.getFindCoursesError
);
