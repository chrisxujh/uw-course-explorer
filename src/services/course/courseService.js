import Axios from "axios";
import { SERVER_URL } from "../../config/config";

const parseResponse = res => res.data;

export const getCourses = () =>
  Axios.get(`${SERVER_URL}/course`).then(parseResponse);

export const getCourseById = id =>
  Axios.get(`${SERVER_URL}/course/${id}`).then(parseResponse);

export const getCourseSchedule = (term, subject, catalogNumber) =>
  Axios.get(
    `${SERVER_URL}/term/${term}/${subject}/${catalogNumber}/schedule`
  ).then(parseResponse);
