import { takeLatest, call, put } from "redux-saga/effects";
import {
  coursesActionTypes,
  getCoursesFailure,
  getCoursesSuccess,
  getShortlistedCoursesFailure,
  getShortlistedCoursesSuccess
} from "./actions";
import * as subjectService from "../../services/subject/subjectService";
import * as courseService from "../../services/course/courseService";

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

export default function*() {
  yield takeLatest(coursesActionTypes.GET_COURSES, getCourses);
  yield takeLatest(
    coursesActionTypes.GET_SHORTLISTED_COURSES,
    handleGetShortlistedCourses
  );
}
