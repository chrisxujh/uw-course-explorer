export const coursesActionTypes = {
  GET_COURSES: "courses/GET_COURSES",
  GET_COURSES_SUCCESS: "courses/GET_COURSES_SUCCESS",
  GET_COURSES_FAILURE: "courses/GET_COURSES_FAILURE"
};

export const getCourses = (subject = null) => ({
  type: coursesActionTypes.GET_COURSES,
  subject
});

export const getCoursesSuccess = courses => ({
  type: coursesActionTypes.GET_COURSES_SUCCESS,
  courses
});

export const getCoursesFailure = error => ({
  type: coursesActionTypes.GET_COURSES_FAILURE,
  error
});
