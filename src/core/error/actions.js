export const errorActionTypes = {
  NETWORK_ERROR: "error/NETWORK_ERROR",
  SERVICE_UNAVAILABLE_ERROR: "error/SERVICE_UNAVAILABLE_ERROR"
};

export const networkError = error => ({
  type: errorActionTypes.NETWORK_ERROR,
  error
});

export const serviceUnavailableError = error => ({
  type: errorActionTypes.SERVICE_UNAVAILABLE_ERROR,
  error
});
