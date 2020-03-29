export const resultActionTypes = {
  GET_SEARCH_RESULT: "search/GET_SEARCH_RESULT",
  CLEAR_SEARCH_RESULT: "search/CLEAR_SEARCH_RESULT",
  GET_SEARCH_RESULT_SUCCESS: "search/GET_SEARCH_RESULT_SUCCESS",
  GET_SEARCH_RESULT_FAILURE: "search/GET_SEARCH_RESULT_FAILURE"
};

export const getSearchResult = payload => ({
  type: resultActionTypes.GET_SEARCH_RESULT,
  payload
});

export const clearSearchResult = () => ({
  type: resultActionTypes.CLEAR_SEARCH_RESULT
});

export const getSearchResultSuccess = payload => ({
  type: resultActionTypes.GET_SEARCH_RESULT_SUCCESS,
  payload
});

export const getSearchResultFailure = payload => ({
  type: resultActionTypes.GET_SEARCH_RESULT_FAILURE,
  payload
});
