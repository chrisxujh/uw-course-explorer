import { coursesActionTypes } from "./actions";
import Immutable from "immutable";
import { userActionTypes } from "../../core/user/actions";

const initialState = {
  loading: false,
  courses: [],
  shortlist: {
    loading: false,
    courses: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case coursesActionTypes.GET_COURSES:
      return { ...state, loading: true };

    case coursesActionTypes.GET_COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.courses };

    case coursesActionTypes.GET_COURSES_FAILURE:
      return { ...state, loading: false, courses: [] };

    case coursesActionTypes.GET_SHORTLISTED_COURSES:
      return Immutable.merge(state, { shortlist: { loading: true } });

    case coursesActionTypes.GET_SHORTLISTED_COURSES_SUCCESS:
      return Immutable.merge(state, {
        shortlist: { loading: false, courses: action.courses }
      });

    case userActionTypes.LOG_OUT_SUCCESS:
    case coursesActionTypes.GET_SHORTLISTED_COURSES_FAILURE:
      return Immutable.merge(state, {
        shortlist: { loading: false, courses: [] }
      });

    default:
      break;
  }

  return state;
}
