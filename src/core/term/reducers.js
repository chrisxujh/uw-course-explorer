import { coreActionTypes } from "./actions";

const initialState = {
  loading: false,
  previousTerm: null,
  currentTerm: null,
  nextTerm: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case coreActionTypes.GET_TERMS:
      return { ...state, loading: true };

    case coreActionTypes.GET_TERMS_SUCCESS: {
      const { previousTerm, currentTerm, nextTerm } = action.result;
      return {
        ...state,
        loading: false,
        previousTerm,
        currentTerm,
        nextTerm
      };
    }

    case coreActionTypes.GET_TERMS_FAILURE:
      return { ...state, loading: false };

    default:
      break;
  }

  return state;
}
