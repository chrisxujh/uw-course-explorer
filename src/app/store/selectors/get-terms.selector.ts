import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromState from '../states';

export const getGetTermsStateSelector: MemoizedSelector<
  any,
  fromState.GetTermsState
> = createFeatureSelector<fromState.GetTermsState>('getTerms');

export const getTermsEntitiesSelector: MemoizedSelector<
  fromState.StoreState,
  any
> = createSelector(
  getGetTermsStateSelector,
  fromState.getGetTermsEntities
);

export const getTermsLoadingSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getGetTermsStateSelector,
  fromState.getGetTermsLoading
);

export const getTermsErrorSelector: MemoizedSelector<
  fromState.StoreState,
  boolean
> = createSelector(
  getGetTermsStateSelector,
  fromState.getGetTermsError
);
