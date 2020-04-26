import { userActionTypes } from './actions';
import { combineReducers } from 'redux';
import { courseActionTypes } from '../../components/course/actions';
import { getCourseCode } from '../../utils/utils';

const userInfoInitialState = {
  loading: false,
  loggedIn: false,
  displayName: null,
  avatarUrl: '',
  id: null,
  shortlistedCourses: []
};

const userInfo = (state = userInfoInitialState, action) => {
  const { type, userInfo } = action;

  switch (type) {
    case userActionTypes.GET_USER_INFO:
      return { ...state, loading: true };

    case userActionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        displayName: userInfo.displayName,
        id: userInfo.id,
        avatarUrl: userInfo.avatarUrl,
        shortlistedCourses: userInfo.shortlistedCourses || []
      };

    case userActionTypes.GET_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false
      };

    case userActionTypes.LOG_OUT:
      return { ...state, loading: true };

    case userActionTypes.LOG_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false
      };

    case userActionTypes.LOG_OUT_FAILURE:
      return { ...state, loading: false };

    default:
      break;
  }

  return { ...state };
};

const coursesTakenInitialState = {
  loading: false,
  coursesTaken: [],
  coursesTakenMap: {}
};

const buildCoursesTakenMap = coursesTaken =>
  coursesTaken.reduce((map, course) => {
    map[getCourseCode(course.subject, course.catalogNumber)] = course;

    return map;
  }, {});

const coursesTaken = (state = coursesTakenInitialState, action) => {
  switch (action.type) {
    case courseActionTypes.MARK_COURSE_TAKEN_SUCCESS:
    case courseActionTypes.UN_MARK_COURSE_TAKEN_SUCCESS: {
      const coursesTakenMap = buildCoursesTakenMap(action.coursesTaken);

      return {
        ...state,
        coursesTaken: action.coursesTaken,
        coursesTakenMap,
        loading: false
      };
    }

    case userActionTypes.GET_USER_INFO_SUCCESS: {
      const coursesTakenMap = buildCoursesTakenMap(
        action.userInfo.coursesTaken
      );

      return {
        ...state,
        loading: false,
        coursesTaken: action.userInfo.coursesTaken,
        coursesTakenMap
      };
    }
    default:
      break;
  }

  return { ...state };
};

export default combineReducers({ userInfo, coursesTaken });
