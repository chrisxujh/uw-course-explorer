import { takeLatest, call, put } from "redux-saga/effects";
import {
  subjectsActionTypes,
  getSubjectsSuccess,
  getSubjectsFailure
} from "./actions";
import * as subjectService from "../../services/subject/subjectService";

function* getSubjects() {
  try {
    const subjects = yield call(subjectService.getSubjects);
    yield put(getSubjectsSuccess(subjects));
  } catch (error) {
    yield put(getSubjectsFailure(error));
  }
}

export default function*() {
  yield takeLatest(subjectsActionTypes.GET_SUBJECTS, getSubjects);
}
