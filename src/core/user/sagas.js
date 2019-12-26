import { takeLatest, put, call } from "redux-saga/effects";
import {
  userActionTypes,
  oauthSignInFailure,
  oauthSignInSuccess
} from "./actions";
import { doOAuth } from "../services/oauth/oauthService";

function* oauthSignIn({ provider, params }) {
  try {
    const { accessToken } = params;
    const result = yield call(doOAuth, provider, accessToken);
    localStorage.setItem("oauth-provider", provider);
    localStorage.setItem("oauth-token", accessToken);
    yield put(oauthSignInSuccess(result));
  } catch (error) {
    localStorage.removeItem("oauth-provider");
    localStorage.removeItem("oauth-token");
    yield put(oauthSignInFailure(error));
  }
}

export default function*() {
  yield takeLatest(userActionTypes.OAUTH_SIGN_IN, oauthSignIn);
}
