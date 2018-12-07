import * as fromState from '../states';
import * as fromAction from '../actions';

export function GetCourseScheduleReducer(
  state: fromState.GetCourseScheduleState = fromState.initialGetCourseScheduleState,
  action: fromAction.GetCourseScheduleActions
) {
  switch (action.type) {
    case fromAction.GET_COURSE_SCHEDULE:
    case fromAction.GET_COURSE_EXAM_SCHEDULE: {
      return { ...state, isLoading: true, isError: false };
    }

    case fromAction.GET_COURSE_SCHEDULE_SUCCESS: {
      const findCoursesEntities = action.payload;
      return {
        ...state,
        findCoursesEntities,
        isLoading: false,
        isError: false
      };
    }

    case fromAction.GET_COURSE_SCHEDULE_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
  }
  return state;
}
