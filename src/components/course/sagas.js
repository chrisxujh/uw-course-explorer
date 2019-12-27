import { takeLatest, put, call } from "redux-saga/effects";
import {
  courseActionTypes,
  getCourseFailure,
  getCourseSuccess,
  getCourseScheduleFailure,
  getCourseScheduleSuccess,
  shortlistCourseFailure,
  shortlistCourseSuccess,
  unshortlistCourseSuccess,
  unshortlistCourseFailure
} from "./actions";
import * as courseService from "../../services/course/courseService";

function* handleGetCourseById({ id }) {
  try {
    const course = yield call(courseService.getCourseById, id);
    yield put(getCourseSuccess(course));
  } catch (error) {
    yield put(getCourseFailure(error));
  }
}

function* getCourseSchedule({ term, subject, catalogNumber }) {
  try {
    const schedule = yield call(
      courseService.getCourseSchedule,
      term,
      subject,
      catalogNumber
    );
    yield put(getCourseScheduleSuccess(schedule));
  } catch (error) {
    yield put(getCourseScheduleFailure(error));
  }
}

function* handleShortlistCourse({ course }) {
  try {
    const { course_id } = course;
    yield call(courseService.shortlistCourse, course_id);
    yield put(shortlistCourseSuccess(course));
  } catch (error) {
    yield put(shortlistCourseFailure(error));
  }
}

function* handleUnshortlistCourse({ course }) {
  try {
    const { course_id } = course;
    yield call(courseService.unshortlistCourse, course_id);
    yield put(unshortlistCourseSuccess(course));
  } catch (error) {
    yield put(unshortlistCourseFailure(error));
  }
}

export default function*() {
  yield takeLatest(courseActionTypes.GET_COURSE_BY_ID, handleGetCourseById);
  yield takeLatest(courseActionTypes.GET_COURSE_SCHEDULE, getCourseSchedule);
  yield takeLatest(courseActionTypes.SHORTLIST_COURSE, handleShortlistCourse);
  yield takeLatest(
    courseActionTypes.UNSHORTLIST_COURSE,
    handleUnshortlistCourse
  );
}
