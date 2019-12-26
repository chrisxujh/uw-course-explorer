import Axios from "axios";
import { SERVER_URL } from "../../../config/config";

const parseResponse = res => res.data;

export const getAllTerms = () =>
  Axios.get(`${SERVER_URL}/term`).then(parseResponse);
