import { createSelector } from "reselect";

const selectDomain = state => state.user;

export const userIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);

export const userIsSignedInSelector = createSelector(
  selectDomain,
  subState => subState.signedIn
);
