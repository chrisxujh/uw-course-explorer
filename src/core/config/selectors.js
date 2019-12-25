import { createSelector } from "reselect";

const selectDomain = state => state.config;

export const configIsLoadingSelector = createSelector(
  selectDomain,
  subState => subState.loading
);

export const configSelector = createSelector(
  selectDomain,
  subState => subState.config
);
