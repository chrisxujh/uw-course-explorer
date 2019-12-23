import { courseActionTypes } from "./actions";

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
      return { ...state, schedule: { loading: false } };

    default:
      break;
  }

  return state;
}
