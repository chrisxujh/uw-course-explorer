import { configActionTypes } from "./actions";

const initialState = {
  loading: false,
  config: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case configActionTypes.FETCH_CONFIG:
      return { ...state, loading: true };

    case configActionTypes.FETCH_CONFIG_SUCCESS:
      return { ...state, loading: false, config: action.config };

    default:
      break;
  }

  return state;
}
