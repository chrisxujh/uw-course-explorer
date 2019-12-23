import { coreActionTypes } from "./actions";

const initialState = {
  loading: false,
  previousTerm: null,
  currentTerm: null,
  nextTerm: null,
  terms: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case coreActionTypes.GET_TERMS:
      return { ...state, loading: true };

    case coreActionTypes.GET_TERMS_SUCCESS: {
      const {
        previous_term,
        current_term,
        next_term,
        listings
      } = action.result;
      return {
        ...state,
        loading: false,
        previousTerm: previous_term,
        currentTerm: current_term,
        nextTerm: next_term,
        terms: listings
      };
    }

    case coreActionTypes.GET_TERMS_FAILURE:
      return { ...state, loading: false };

    default:
      break;
  }

  return state;
}
