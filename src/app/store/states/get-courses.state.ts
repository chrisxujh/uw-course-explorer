export interface GetCoursesState {
  getCoursesEntities: any;
  isLoading: boolean;
  isError: boolean;
}

export const initialGetCoursesState: GetCoursesState = {
  getCoursesEntities: {},
  isLoading: false,
  isError: false
};

export const getGetCoursesEntities = (state: GetCoursesState) =>
  state.getCoursesEntities;

export const getGetCoursesLoading = (state: GetCoursesState) => state.isLoading;

export const getGetCoursesError = (state: GetCoursesState) => state.isError;
