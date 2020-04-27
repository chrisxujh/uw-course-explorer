import { coursesActionTypes } from './actions';
import Immutable from 'immutable';
import { userActionTypes } from '../../core/user/actions';
import { combineReducers } from 'redux';

const coursesInitialState = {
  loading: false,
  courses: [],
  shortlist: {
    loading: false,
    courses: []
  }
};

const courses = (state = coursesInitialState, action) => {
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
};

const unlockedCourses = (state = [], action) => {
  switch (action.type) {
    case coursesActionTypes.GET_UNLOCKED_COURSES_SUCCESS:
      return action.courses || [];

    case coursesActionTypes.GET_UNLOCKED_COURSES:
    case coursesActionTypes.GET_UNLOCKED_COURSES_FAILURE:
    case userActionTypes.LOG_OUT_SUCCESS:
      return [];

    default:
      break;
  }

  return [...state];
};

const unlockedCoursesMap = (state = {}, action) => {
  switch (action.type) {
    case coursesActionTypes.GET_UNLOCKED_COURSES_SUCCESS: {
      const unlockedCourses = action.courses || [];
      const newState = unlockedCourses.reduce((map, course) => {
        map[course.name] = course;

        return map;
      }, {});

      return newState;
    }

    case coursesActionTypes.GET_UNLOCKED_COURSES:
    case coursesActionTypes.GET_UNLOCKED_COURSES_FAILURE:
    case userActionTypes.LOG_OUT_SUCCESS:
      return {};

    default:
      break;
  }

  return { ...state };
};

export default combineReducers({
  courses,
  unlockedCourses,
  unlockedCoursesMap
});
