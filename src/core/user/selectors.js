import { createSelector } from 'reselect';

const selectDomain = state => state.user;

export const userInfoSelector = createSelector(
  selectDomain,
  subState => subState.userInfo
);

export const userIsLoadingSelector = createSelector(
  userInfoSelector,
  subState => subState.loading
);

export const userIsLoggedInSelector = createSelector(
  userInfoSelector,
  subState => subState.loggedIn
);

const selectCoursesTakenDomain = createSelector(
  selectDomain,
  subState => subState.coursesTaken
);

export const coursesTakenSelector = createSelector(
  selectCoursesTakenDomain,
  subState => subState.coursesTaken
);

export const coursesTakenMapSelector = createSelector(
  selectCoursesTakenDomain,
  subState => subState.coursesTakenMap
);
