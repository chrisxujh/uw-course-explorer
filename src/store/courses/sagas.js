import { takeLatest, call, put } from 'redux-saga/effects';
import {
  coursesActionTypes,
  getCoursesFailure,
  getCoursesSuccess,
  getShortlistedCoursesFailure,
  getShortlistedCoursesSuccess,
  getUnlockedCoursesFailure,
  getUnlockedCoursesSuccess,
  getUnlockedCourses
} from './actions';
import * as subjectService from '../../services/subject/subjectService';
import * as courseService from '../../services/course/courseService';
import { userActionTypes } from '../../core/user/actions';
import { courseActionTypes } from '../../components/course/actions';

function* getCourses({ subject }) {
  try {
    let courses = null;
    if (subject !== null) {
      courses = yield call(subjectService.getCoursesBySubject, subject);
    } else {
      courses = yield call(courseService.getCourses);
    }
    yield put(getCoursesSuccess(courses));
  } catch (error) {
    yield put(getCoursesFailure(error));
  }
}

function* handleGetShortlistedCourses() {
  try {
    const courses = yield call(courseService.getShortlistedCourses);
    yield put(getShortlistedCoursesSuccess(courses));
  } catch (error) {
    yield put(getShortlistedCoursesFailure(error));
  }
}

function* handleGetUnlockCourses() {
  try {
    const { courses = [] } = yield call(courseService.getUnlockedCourses);

    yield put(getUnlockedCoursesSuccess({ courses }));
  } catch (error) {
    console.error(error);
    yield put(getUnlockedCoursesFailure());
  }
}

function* handleUpdateUnlockedCourses() {
  yield put(getUnlockedCourses());
}

export default function* () {
  yield takeLatest(coursesActionTypes.GET_COURSES, getCourses);
  yield takeLatest(
    coursesActionTypes.GET_SHORTLISTED_COURSES,
    handleGetShortlistedCourses
  );
  yield takeLatest(
    coursesActionTypes.GET_UNLOCKED_COURSES,
    handleGetUnlockCourses
  );

  yield takeLatest(
    courseActionTypes.MARK_COURSE_TAKEN_SUCCESS,
    handleUpdateUnlockedCourses
  );
  yield takeLatest(
    courseActionTypes.UN_MARK_COURSE_TAKEN_SUCCESS,
    handleUpdateUnlockedCourses
  );

  // when user logs in
  yield takeLatest(
    userActionTypes.GET_USER_INFO_SUCCESS,
    handleUpdateUnlockedCourses
  );
}
