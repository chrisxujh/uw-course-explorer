import { createSelector } from "reselect";

const selectDomain = state => state.user;

export const userIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);

export const userInfoSelector = createSelector(
  selectDomain,
  subState => subState.userInfo
);
