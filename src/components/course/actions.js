export const courseActionTypes = {
  GET_COURSE_BY_ID: "course/GET_COURSE_BY_ID",
  GET_COURSE_SUCCESS: "course/GET_COURSE_SUCCESS",
  GET_COURSE_FAILURE: "course/GET_COURSE_FAILURE"
};

export const getCourseById = id => ({
  type: courseActionTypes.GET_COURSE_BY_ID,
  id
});

export const getCourseSuccess = course => ({
  type: courseActionTypes.GET_COURSE_SUCCESS,
  course
});

export const getCourseFailure = error => ({
  type: courseActionTypes.GET_COURSE_FAILURE,
  error
});
