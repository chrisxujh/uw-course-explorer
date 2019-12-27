export const userActionTypes = {
  GET_USER_INFO: "user/GET_USER_INFO",
  GET_USER_INFO_SUCCESS: "user/GET_USER_INFO_SUCCESS",
  GET_USER_INFO_FAILURE: "user/GET_USER_INFO_FAILURE",

  RESUME_USER_SESSION: "user/RESUME_USER_SESSION",

  OAUTH_SIGN_IN: "user/OAUTH_SIGN_IN",
  OAUTH_SIGN_IN_SUCCESS: "user/OAUTH_SIGN_IN_SUCCESS",
  OAUTH_SIGN_IN_FAILURE: "user/OAUTH_SIGN_IN_FAILURE",

  LOG_OUT: "user/LOG_OUT",
  LOG_OUT_SUCCESS: "user/LOG_OUT_SUCCESS",
  LOG_OUT_FAILURE: "user/LOG_OUT_FAILURE"
};

export const getUserInfo = () => ({
  type: userActionTypes.GET_USER_INFO
});

export const getUserInfoSuccess = userInfo => ({
  type: userActionTypes.GET_USER_INFO_SUCCESS,
  userInfo
});

export const getUserInfoFailure = error => ({
  type: userActionTypes.GET_USER_INFO_FAILURE,
  error
});

export const resumeUserSession = () => ({
  type: userActionTypes.RESUME_USER_SESSION
});

export const oauthSignIn = (provider, params) => ({
  type: userActionTypes.OAUTH_SIGN_IN,
  provider,
  params
});

export const oauthSignInSuccess = payload => ({
  type: userActionTypes.OAUTH_SIGN_IN_SUCCESS,
  payload
});

export const oauthSignInFailure = error => ({
  type: userActionTypes.OAUTH_SIGN_IN_FAILURE,
  error
});

export const logOut = () => ({
  type: userActionTypes.LOG_OUT
});

export const logOutSuccess = () => ({
  type: userActionTypes.LOG_OUT_SUCCESS
});

export const logOutFailure = () => ({
  type: userActionTypes.LOG_OUT_FAILURE
});
