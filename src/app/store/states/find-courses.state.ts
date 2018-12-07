export interface FindCoursesState {
  findCoursesEntities: any;
  isLoading: boolean;
  isError: boolean;
}

export const initialFindCoursesState: FindCoursesState = {
  findCoursesEntities: {},
  isLoading: false,
  isError: false
};

export const getFindCoursesEntities = (state: FindCoursesState) =>
  state.findCoursesEntities;

export const getFindCoursesLoading = (state: FindCoursesState) =>
  state.isLoading;

export const getFindCoursesError = (state: FindCoursesState) => state.isError;
