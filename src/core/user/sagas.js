import { takeLatest, put, call } from "redux-saga/effects";
import {
  userActionTypes,
  oauthSignInFailure,
  oauthSignInSuccess,
  getUserInfo,
  getUserInfoFailure,
  getUserInfoSuccess,
  logOutFailure,
  logOutSuccess
} from "./actions";
import * as userService from "../services/user/userService";

function* oauthSignIn({ provider, params }) {
  try {
    const { accessToken } = params;
    const result = yield call(userService.doOAuth, provider, accessToken);
    localStorage.setItem("oauth-provider", provider);
    localStorage.setItem("oauth-token", accessToken);
    yield put(oauthSignInSuccess(result));
    yield put(getUserInfo());
  } catch (error) {
    localStorage.removeItem("oauth-provider");
    localStorage.removeItem("oauth-token");
    yield put(oauthSignInFailure(error));
  }
}

function* handleGetUserInfo() {
  try {
    const userInfo = yield call(userService.getUserInfo);
    yield put(getUserInfoSuccess(userInfo));
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}

function* handleResumeUserSession() {
  try {
    const { loggedIn } = yield call(userService.checkLoginStatus);
    if (loggedIn) yield put(getUserInfo());
  } catch (error) {
    console.error(error);
  }
}

function* handleUserLogOut() {
  try {
    yield call(userService.logOut);
    yield put(logOutSuccess());
  } catch (error) {
    yield put(logOutFailure(error));
  }
}

export default function*() {
  yield takeLatest(userActionTypes.OAUTH_SIGN_IN, oauthSignIn);
  yield takeLatest(userActionTypes.GET_USER_INFO, handleGetUserInfo);
  yield takeLatest(
    userActionTypes.RESUME_USER_SESSION,
    handleResumeUserSession
  );
  yield takeLatest(userActionTypes.LOG_OUT, handleUserLogOut);
}
