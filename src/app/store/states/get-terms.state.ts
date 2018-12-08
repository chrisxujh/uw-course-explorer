export interface GetTermsState {
  getTermsEntities: any;
  isLoading: boolean;
  isError: boolean;
}

export const initialGetTermsState: GetTermsState = {
  getTermsEntities: {},
  isLoading: false,
  isError: false
};

export const getGetTermsEntities = (state: GetTermsState) =>
  state.getTermsEntities;

export const getGetTermsLoading = (state: GetTermsState) => state.isLoading;

export const getGetTermsError = (state: GetTermsState) => state.isError;
