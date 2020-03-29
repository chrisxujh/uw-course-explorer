import { takeLatest, put, call } from "redux-saga/effects";
import {
  resultActionTypes,
  getSearchResultFailure,
  getSearchResultSuccess
} from "./actions";
import { querySearch } from "../../services/search/searchService";

function* handleSearch({ payload }) {
  try {
    const results = yield call(querySearch, payload);
    yield put(getSearchResultSuccess({ results }));
  } catch (err) {
    yield put(getSearchResultFailure(err));
  }
}

export default function*() {
  yield takeLatest(resultActionTypes.GET_SEARCH_RESULT, handleSearch);
}
