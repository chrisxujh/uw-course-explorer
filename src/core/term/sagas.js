import { put, call, takeLatest } from "redux-saga/effects";
import { getTermsFailre, getTermsSuccess, coreActionTypes } from "./actions";
import * as termService from "../../services/term/termService";

function* getTerms() {
  try {
    const result = yield call(termService.getAllTerms);
    yield put(getTermsSuccess(result));
  } catch (error) {
    yield put(getTermsFailre(error));
  }
}

export default function*() {
  yield takeLatest(coreActionTypes.GET_TERMS, getTerms);
}
