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

export const courseScheduleSelector = createSelector(
  selectDomain,
  subState => subState.schedule
);

export const courseSectionsSelector = createSelector(
  courseScheduleSelector,
  subState => subState.sections
);

export const courseScheduleIsLoadingSelector = createSelector(
  courseScheduleSelector,
  subState => subState.loading
);
