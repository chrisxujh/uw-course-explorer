import { createSelector } from "reselect";

const selectDomain = state => state.term;

export const currentTermSelector = createSelector(
  selectDomain,
  subState => subState.currentTerm
);

export const nextTermSelector = createSelector(
  selectDomain,
  subState => subState.nextTerm
);

export const termIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);
