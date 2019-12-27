export const coursesActionTypes = {
  GET_COURSES: "courses/GET_COURSES",
  GET_COURSES_SUCCESS: "courses/GET_COURSES_SUCCESS",
  GET_COURSES_FAILURE: "courses/GET_COURSES_FAILURE",

  GET_SHORTLISTED_COURSES: "courses/GET_SHORTLISTED_COURSES",
  GET_SHORTLISTED_COURSES_SUCCESS: "courses/GET_SHORTLISTED_COURSES_SUCCESS",
  GET_SHORTLISTED_COURSES_FAILURE: "courses/GET_SHORTLISTED_COURSES_FAILURE"
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

export const getShortlistedCourses = () => ({
  type: coursesActionTypes.GET_SHORTLISTED_COURSES
});

export const getShortlistedCoursesSuccess = courses => ({
  type: coursesActionTypes.GET_SHORTLISTED_COURSES_SUCCESS,
  courses
});

export const getShortlistedCoursesFailure = error => ({
  type: coursesActionTypes.GET_SHORTLISTED_COURSES_FAILURE,
  error
});
