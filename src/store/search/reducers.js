import { combineReducers } from "redux";
import { resultActionTypes } from "./actions";

const results = (state = { isLoading: false, data: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case resultActionTypes.GET_SEARCH_RESULT:
      return { ...state, isLoading: true, data: [] };

    case resultActionTypes.GET_SEARCH_RESULT_SUCCESS:
      return { ...state, isLoading: false, data: payload.results };

    case resultActionTypes.GET_SEARCH_RESULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: []
      };

    default:
      break;
  }

  return { ...state };
};

export default combineReducers({ results });
