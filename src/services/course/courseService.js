import {
  httpGet,
  httpAuthPut,
  httpAuthGet,
  httpAuthPost,
  httpAuthDelete
} from '../../core/services/http/httpService';
import { SERVER_URL } from '../../config/config';

export const getCourses = () => httpGet(`${SERVER_URL}/course`);

export const getCourseById = id => httpAuthGet(`${SERVER_URL}/course/${id}`);

export const getCourseByCatalogNumber = (subject, catalogNumber) =>
  httpAuthGet(`${SERVER_URL}/course/${subject}/${catalogNumber}`);

export const getCourseSchedule = (term, subject, catalogNumber) =>
  httpGet(`${SERVER_URL}/term/${term}/${subject}/${catalogNumber}/schedule`);

export const shortlistCourse = courseId =>
  httpAuthPut(`${SERVER_URL}/course/${courseId}/shortlist`);

export const unshortlistCourse = courseId =>
  httpAuthPut(`${SERVER_URL}/course/${courseId}/unshortlist`);

export const getShortlistedCourses = () =>
  httpAuthGet(`${SERVER_URL}/course/shortlist`);

export const markCourseTaken = (subject, catalogNumber) =>
  httpAuthPost(`${SERVER_URL}/user/coursesTaken`, { subject, catalogNumber });

export const unMarkCourseTaken = (subject, catalogNumber) => {
  const params = new URLSearchParams({ subject, catalogNumber });

  return httpAuthDelete(`${SERVER_URL}/user/coursesTaken?${params.toString()}`);
};
