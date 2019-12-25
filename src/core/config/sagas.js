import { takeLatest, call, put } from "redux-saga/effects";
import {
  configActionTypes,
  fetchConfigFailure,
  fetchConfigSuccess
} from "./actions";
import { configList } from "../../config/config";
import { getConfig } from "../../services/config/configService";

function* fetchConfig() {
  const config = {};
  for (let args of configList) {
    try {
      const { key, url } = args;
      const result = yield call(getConfig, url);
      config[key] = result;
    } catch (error) {
      yield put(fetchConfigFailure(error));
    }
  }
  yield put(fetchConfigSuccess(config));
}

export default function*() {
  yield takeLatest(configActionTypes.FETCH_CONFIG, fetchConfig);
}
