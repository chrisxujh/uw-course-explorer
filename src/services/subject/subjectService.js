import Axios from "axios";
import { SERVER_URL } from "../../config/config";

const parseResponse = res => res.data;

export const getSubjects = () =>
  Axios.get(`${SERVER_URL}/subject`).then(parseResponse);

export const getCoursesBySubject = subject =>
  Axios.get(`${SERVER_URL}/subject/${subject}/course`).then(parseResponse);
