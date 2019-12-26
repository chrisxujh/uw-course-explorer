export const userActionTypes = {
  OAUTH_SIGN_IN: "user/OAUTH_SIGN_IN",
  OAUTH_SIGN_IN_SUCCESS: "user/OAUTH_SIGN_IN_SUCCESS",
  OAUTH_SIGN_IN_FAILURE: "user/OAUTH_SIGN_IN_FAILURE"
};

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
