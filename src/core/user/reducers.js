import { userActionTypes } from "./actions";

const initialState = { loading: false, userInfo: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.GET_USER_INFO:
      return { ...state, loading: true };

    case userActionTypes.GET_USER_INFO_SUCCESS:
      return { ...state, loading: false, userInfo: action.userInfo };

    case userActionTypes.GET_USER_INFO_FAILURE:
      return { ...state, loading: false, userInfo: null };

    default:
      break;
  }
  return state;
}
