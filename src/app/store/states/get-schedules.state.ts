export interface GetSchedulesState {
  getSchedulesEntities: any;
  isLoading: boolean;
  isError: boolean;
}

export const initialGetSchedulesState: GetSchedulesState = {
  getSchedulesEntities: {},
  isLoading: false,
  isError: false
};

export const getGetSchedulesEntities = (state: GetSchedulesState) =>
  state.getSchedulesEntities;

export const getGetSchedulesLoading = (state: GetSchedulesState) =>
  state.isLoading;

export const getGetSchedulesError = (state: GetSchedulesState) => state.isError;
