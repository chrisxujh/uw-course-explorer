import { courseActionTypes } from "./actions";

const initialState = {
  loading: false,
  course: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case courseActionTypes.GET_COURSE_BY_ID:
      return { ...state, loading: true };

    case courseActionTypes.GET_COURSE_SUCCESS:
      return { ...state, loading: false, course: action.course };

    case courseActionTypes.GET_COURSE_FAILURE:
      return { ...state, loading: false, course: null };

    default:
      break;
  }

  return state;
}
