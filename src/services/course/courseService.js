import { httpGet } from "../../core/services/http/httpService";
import { SERVER_URL } from "../../config/config";

export const getCourses = () => httpGet(`${SERVER_URL}/course`);

export const getCourseById = id =>
  httpGet(`${SERVER_URL}/course/${id}`, {
    withCredentials: true
  });

export const getCourseSchedule = (term, subject, catalogNumber) =>
  httpGet(`${SERVER_URL}/term/${term}/${subject}/${catalogNumber}/schedule`);
