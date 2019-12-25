import { createSelector } from "reselect";

const selectDomain = state => state.error;

export const errorSelector = createSelector(
  selectDomain,
  subState => subState.error
);

export const errorMessageSelector = createSelector(
  selectDomain,
  subState => subState.errorMsg
);
