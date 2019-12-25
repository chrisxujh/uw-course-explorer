const initialState = {
  error: null,
  errorType: null,
  errorMsg: null
};

export default function(state = initialState, action) {
  const errorRegexp = new RegExp("^error/");
  const isError = errorRegexp.test(action.type);
  if (isError) {
    const { error, type } = action;
    return { ...state, error: error, errorType: type, errorMsg: error.message };
  }
  return state;
}
