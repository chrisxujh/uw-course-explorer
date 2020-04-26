import { takeLatest, put, call } from 'redux-saga/effects';
import {
  courseActionTypes,
  getCourseFailure,
  getCourseSuccess,
  getCourseScheduleFailure,
  getCourseScheduleSuccess,
  shortlistCourseFailure,
  shortlistCourseSuccess,
  unshortlistCourseSuccess,
  unshortlistCourseFailure,
  markCourseTakenSuccess,
  markCourseTakenFailure,
  unMarkCourseTakenSuccess,
  unMarkCourseTakenFailure
} from './actions';
import * as courseService from '../../services/course/courseService';

function* handleGetCourseByCatalogNumber({
  payload: { subject, catalogNumber }
}) {
  try {
    const course = yield call(
      courseService.getCourseByCatalogNumber,
      subject,
      catalogNumber
    );

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

function* handleMarkTaken({ payload: { subject, catalogNumber } }) {
  try {
    const { coursesTaken } = yield call(
      courseService.markCourseTaken,
      subject,
      catalogNumber
    );

    yield put(markCourseTakenSuccess({ coursesTaken }));
  } catch (error) {
    console.error(error);
    yield put(markCourseTakenFailure(error));
  }
}

function* handleUnMarkTaken({ payload: { subject, catalogNumber } }) {
  try {
    const { coursesTaken } = yield call(
      courseService.unMarkCourseTaken,
      subject,
      catalogNumber
    );

    yield put(unMarkCourseTakenSuccess({ coursesTaken }));
  } catch (error) {
    console.error(error);
    yield put(unMarkCourseTakenFailure(error));
  }
}

export default function* () {
  yield takeLatest(
    courseActionTypes.GET_COURSE_BY_CATALOG_NUMBER,
    handleGetCourseByCatalogNumber
  );
  yield takeLatest(courseActionTypes.GET_COURSE_SCHEDULE, getCourseSchedule);
  yield takeLatest(courseActionTypes.SHORTLIST_COURSE, handleShortlistCourse);
  yield takeLatest(
    courseActionTypes.UNSHORTLIST_COURSE,
    handleUnshortlistCourse
  );
  yield takeLatest(courseActionTypes.MARK_COURSE_TAKEN, handleMarkTaken);
  yield takeLatest(courseActionTypes.UN_MARK_COURSE_TAKEN, handleUnMarkTaken);
}
