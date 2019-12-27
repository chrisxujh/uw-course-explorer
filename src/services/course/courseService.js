import {
  httpGet,
  httpAuthPut,
  httpAuthGet
} from "../../core/services/http/httpService";
import { SERVER_URL } from "../../config/config";

export const getCourses = () => httpGet(`${SERVER_URL}/course`);

export const getCourseById = id =>
  httpGet(`${SERVER_URL}/course/${id}`, {
    withCredentials: true
  });

export const getCourseSchedule = (term, subject, catalogNumber) =>
  httpGet(`${SERVER_URL}/term/${term}/${subject}/${catalogNumber}/schedule`);

export const shortlistCourse = courseId =>
  httpAuthPut(`${SERVER_URL}/course/${courseId}/shortlist`);

export const unshortlistCourse = courseId =>
  httpAuthPut(`${SERVER_URL}/course/${courseId}/unshortlist`);

export const getShortlistedCourses = () =>
  httpAuthGet(`${SERVER_URL}/course/shortlist`);
