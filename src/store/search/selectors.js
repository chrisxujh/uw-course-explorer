import { createSelector } from "reselect";

const selectDomain = state => state.search;

const selectSearchResults = createSelector(
  selectDomain,
  subState => subState.results
);

export const searchResultsSelector = createSelector(
  selectSearchResults,
  subState => subState.data
);

export const searchResultsIsLoadingSelector = createSelector(
  selectSearchResults,
  subState => subState.isLoading
);
