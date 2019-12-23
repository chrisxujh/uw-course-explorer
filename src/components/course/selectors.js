import { createSelector } from "reselect";

const selectDomain = state => state.course;

export const courseSelector = createSelector(
  selectDomain,
  subState => subState.course
);

export const courseIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);
