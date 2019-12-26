import { put, call, takeLatest } from "redux-saga/effects";
import { getTermsFailre, getTermsSuccess, coreActionTypes } from "./actions";
import * as termService from "../../core/services/term/termService";

function* getTerms() {
  try {
    const res = yield call(termService.getAllTerms);
    const { previous_term, current_term, next_term, listings } = res;
    const result = {
      previousTerm: { id: previous_term },
      currentTerm: { id: current_term },
      nextTerm: { id: next_term }
    };

    Object.keys(listings).forEach(key =>
      listings[key].forEach(term => {
        if (term.id === previous_term) {
          result.previousTerm = term;
        } else if (term.id === current_term) {
          result.currentTerm = term;
        } else if (term.id === next_term) {
          result.nextTerm = term;
        }
      })
    );

    yield put(getTermsSuccess(result));
  } catch (error) {
    yield put(getTermsFailre(error));
  }
}

export default function*() {
  yield takeLatest(coreActionTypes.GET_TERMS, getTerms);
}
