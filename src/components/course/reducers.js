import { courseActionTypes } from "./actions";
import Immutable from "immutable";

const initialState = {
  loading: false,
  course: null,
  schedule: {
    loading: false,
    sections: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case courseActionTypes.GET_COURSE_BY_ID:
      return { ...state, loading: true };

    case courseActionTypes.GET_COURSE_SUCCESS:
      return { ...state, loading: false, course: action.course };

    case courseActionTypes.GET_COURSE_FAILURE:
      return { ...state, loading: false, course: null };

    case courseActionTypes.GET_COURSE_SCHEDULE:
      return { ...state, schedule: { ...state.schedule, loading: true } };

    case courseActionTypes.GET_COURSE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: false,
          sections: action.sections
        }
      };

    case courseActionTypes.GET_COURSE_SCHEDULE_FAILURE:
      return { ...state, schedule: { ...state.schedule, loading: false } };

    case courseActionTypes.SHORTLIST_COURSE_SUCCESS:
    case courseActionTypes.UNSHORTLIST_COURSE_SUCCESS:
      return Immutable.merge(state, {
        course: {
          shortlisted:
            action.type === courseActionTypes.SHORTLIST_COURSE_SUCCESS &&
            action.course.course_id === state.course.course_id
        }
      });

    default:
      break;
  }

  return state;
}
