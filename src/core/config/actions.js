export const configActionTypes = {
  FETCH_CONFIG: "config/FETCH_CONFIG",
  FETCH_CONFIG_SUCCESS: "config/FETCH_CONFIG_SUCCESS",
  FETCH_CONFIG_FAILURE: "config/FETCH_CONFIG_FAILURE"
};

export const fetchConfig = () => ({
  type: configActionTypes.FETCH_CONFIG
});

export const fetchConfigSuccess = config => ({
  type: configActionTypes.FETCH_CONFIG_SUCCESS,
  config
});

export const fetchConfigFailure = error => ({
  type: configActionTypes.FETCH_CONFIG_FAILURE,
  error
});
