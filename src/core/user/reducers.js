import { userActionTypes } from "./actions";

const initialState = { loading: false, loggedIn: false, userInfo: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.GET_USER_INFO:
      return { ...state, loading: true };

    case userActionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        userInfo: action.userInfo
      };

    case userActionTypes.GET_USER_INFO_FAILURE:
      return { ...state, loading: false, loggedIn: false, userInfo: null };

    case userActionTypes.LOG_OUT:
      return { ...state, loading: true };

    case userActionTypes.LOG_OUT_SUCCESS:
      return { ...state, loading: false, loggedIn: false, userInfo: null };

    case userActionTypes.LOG_OUT_FAILURE:
      return { ...state, loading: false };

    default:
      break;
  }
  return state;
}
