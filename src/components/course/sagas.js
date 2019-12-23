import { takeLatest, put, call } from "redux-saga/effects";
import {
  courseActionTypes,
  getCourseFailure,
  getCourseSuccess,
  getCourseScheduleFailure,
  getCourseScheduleSuccess
} from "./actions";
import * as courseService from "../../services/course/courseService";

function* getCourseById({ id }) {
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

export default function*() {
  yield takeLatest(courseActionTypes.GET_COURSE_BY_ID, getCourseById);
  yield takeLatest(courseActionTypes.GET_COURSE_SCHEDULE, getCourseSchedule);
}
