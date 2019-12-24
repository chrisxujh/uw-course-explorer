import { subjectsActionTypes } from "./actions";

const initialState = { loading: false, subjects: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case subjectsActionTypes.GET_SUBJECTS:
      return { ...state, loading: true };

    case subjectsActionTypes.GET_SUBJECTS_SUCCESS:
      return { ...state, loading: false, subjects: action.subjects };

    case subjectsActionTypes.GET_SUBJECTS_FAILURE:
      return { ...state, loading: false, subjects: [] };

    default:
      break;
  }

  return state;
}
