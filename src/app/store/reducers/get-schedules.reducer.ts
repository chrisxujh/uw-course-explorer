import * as fromState from '../states';
import * as fromAction from '../actions';

export function GetSchedulesReducer(
  state: fromState.GetSchedulesState = fromState.initialGetSchedulesState,
  action: fromAction.GetSchedulesActions
) {
  switch (action.type) {
    case fromAction.GET_COURSE_SCHEDULE:
    case fromAction.GET_COURSE_EXAM_SCHEDULE: {
      return { ...state, isLoading: true, isError: false };
    }

    case fromAction.GET_SCHEDULES_SUCCESS: {
      const getSchedulesEntities = action.payload;
      return {
        ...state,
        getSchedulesEntities,
        isLoading: false,
        isError: false
      };
    }

    case fromAction.GET_SCHEDULES_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
  }
  return state;
}
