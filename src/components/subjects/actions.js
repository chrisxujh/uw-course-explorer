export const subjectsActionTypes = {
  GET_SUBJECTS: "subjects/GET_SUBJECTS",
  GET_SUBJECTS_SUCCESS: "subjects/GET_SUBJECTS_SUCCESS",
  GET_SUBJECTS_FAILURE: "subjects/GET_SUBJECTS_FAILURE"
};

export const getSubjects = () => ({
  type: subjectsActionTypes.GET_SUBJECTS
});

export const getSubjectsSuccess = subjects => ({
  type: subjectsActionTypes.GET_SUBJECTS_SUCCESS,
  subjects
});

export const getSubjectsFailure = error => ({
  type: subjectsActionTypes.GET_SUBJECTS_FAILURE,
  error
});
