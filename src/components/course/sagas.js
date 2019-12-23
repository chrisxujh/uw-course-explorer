import { takeLatest, put, call } from "redux-saga/effects";
import {
  courseActionTypes,
  getCourseFailure,
  getCourseSuccess
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

export default function*() {
  yield takeLatest(courseActionTypes.GET_COURSE_BY_ID, getCourseById);
}
