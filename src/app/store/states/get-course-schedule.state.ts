export interface GetCourseScheduleState {
  findCoursesEntities: any;
  isLoading: boolean;
  isError: boolean;
}

export const initialGetCourseScheduleState: GetCourseScheduleState = {
  findCoursesEntities: {},
  isLoading: false,
  isError: false
};

export const getGetCourseScheduleEntities = (state: GetCourseScheduleState) =>
  state.findCoursesEntities;

export const getGetCourseScheduleLoading = (state: GetCourseScheduleState) =>
  state.isLoading;

export const getGetCourseScheduleError = (state: GetCourseScheduleState) =>
  state.isError;
