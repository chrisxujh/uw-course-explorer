import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromState from '../states';

export const getCourseScheduleStateSelector: MemoizedSelector<
  any,
  fromState.FindCoursesState
> = createFeatureSelector<fromState.FindCoursesState>('getCourseSchedule');

export const getCourseScheduleEntitiesSelector: MemoizedSelector<
  fromState.StoreState,
  any
> = createSelector(
  getCourseScheduleStateSelector,
  fromState.getGetCourseScheduleEntities
);

export const getCourseScheduleLoadingSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getCourseScheduleStateSelector,
  fromState.getGetCourseScheduleLoading
);

export const getCourseScheduleErrorSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getCourseScheduleStateSelector,
  fromState.getGetCourseScheduleError
);
