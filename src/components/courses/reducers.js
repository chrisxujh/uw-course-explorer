import { coursesActionTypes } from "./actions";

const initialState = {
  loading: false,
  courses: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case coursesActionTypes.GET_COURSES:
      return { ...state, loading: true };

    case coursesActionTypes.GET_COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.courses };

    case coursesActionTypes.GET_COURSES_FAILURE:
      return { ...state, loading: false, courses: [] };

    default:
      break;
  }

  return state;
}
