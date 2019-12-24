import { createSelector } from "reselect";

const selectDomain = state => state.subjects;

export const subjectsSelector = createSelector(
  selectDomain,
  subState => subState.subjects
);

export const subjectsIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);
