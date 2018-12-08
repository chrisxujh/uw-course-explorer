import * as fromAction from '../actions';
import * as fromState from '../states';

export function GetTermsReducer(
  state: fromState.GetTermsState = fromState.initialGetTermsState,
  action: fromAction.GetTermsActions
) {
  switch (action.type) {
    case fromAction.GET_TERMS: {
      return { ...state, isLoading: true, isError: false };
    }

    case fromAction.GET_TERMS_SUCCESS: {
      const getTermsEntities = action.payload;
      return { ...state, getTermsEntities, isLoading: false, isError: false };
    }
    case fromAction.GET_TERMS_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
  }
  return state;
}
