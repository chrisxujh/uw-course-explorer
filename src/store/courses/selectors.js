import { createSelector } from 'reselect';

const selectDomain = state => state.courses;

const selectCoursesDomain = createSelector(
  selectDomain,
  subState => subState.courses
);

export const coursesSelector = createSelector(
  selectCoursesDomain,
  subState => subState.courses
);

export const coursesIsLoadingSelector = createSelector(
  selectCoursesDomain,
  subState => subState.loading
);

const shortlistSelector = createSelector(
  selectCoursesDomain,
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

export const unlockedCoursesMapSelector = createSelector(
  selectDomain,
  subState => subState.unlockedCoursesMap
);
