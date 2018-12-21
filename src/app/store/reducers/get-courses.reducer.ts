import * as fromState from '../states';
import * as fromAction from '../actions';

export function GetCoursesReducer(
  state: fromState.GetCoursesState = fromState.initialGetCoursesState,
  action: fromAction.GetCoursesActions
) {
  switch (action.type) {
    case fromAction.GET_SUBJECTS:
    case fromAction.GET_COURSES:
    case fromAction.GET_COURSE_BY_ID:
    case fromAction.GET_COURSES_BY_SUBJECT: {
      return { ...state, isLoading: true, isError: false };
    }

    case fromAction.GET_SUBJECTS_SUCCESS:
    case fromAction.GET_COURSES_SUCCESS: {
      const getCoursesEntities = action.payload;
      return {
        ...state,
        getCoursesEntities,
        isLoading: false,
        isError: false
      };
    }

    case fromAction.GET_SUBJECTS_FAILURE:
    case fromAction.GET_COURSES_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
  }
  return state;
}
