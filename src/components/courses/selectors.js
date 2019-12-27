import { createSelector } from "reselect";

const selectDomain = state => state.courses;

export const coursesSelector = createSelector(
  selectDomain,
  subState => subState.courses
);

export const coursesIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);

const shortlistSelector = createSelector(
  selectDomain,
  subState => subState.shortlist
);

export const shortlistIsLoadingSelector = createSelector(
  shortlistSelector,
  subState => subState.loading
);

export const shortlistedCoursesSelector = createSelector(
  shortlistSelector,
  subState => subState.courses
);
