import { userActionTypes } from "./actions";

const initialState = { loading: false, signedIn: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.OAUTH_SIGN_IN:
      return { ...state, loading: true, signedIn: false };

    case userActionTypes.OAUTH_SIGN_IN_SUCCESS: {
      const { displayName } = action.payload;
      return { ...state, loading: false, signedIn: true, displayName };
    }

    case userActionTypes.OAUTH_SIGN_IN_FAILURE:
      return { ...state, loading: false, signedIn: false };

    default:
      break;
  }
  return state;
}
