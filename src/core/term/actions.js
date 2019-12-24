export const coreActionTypes = {
  GET_TERMS: "core/GET_TERMS",
  GET_TERMS_SUCCESS: "core/GET_TERMS_SUCCESS",
  GET_TERMS_FAILURE: "core/GET_TERMS_FAILURE"
};

export const getTerms = () => ({
  type: coreActionTypes.GET_TERMS
});

export const getTermsSuccess = result => ({
  type: coreActionTypes.GET_TERMS_SUCCESS,
  result
});

export const getTermsFailre = error => ({
  type: coreActionTypes.GET_TERMS_FAILURE,
  error
});
