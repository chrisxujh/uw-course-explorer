import Axios from "axios";
import { FEATURE_FLAG_SERVER_URL } from "../../../config/config";

const parseResponse = res => res.data;

export const getConfig = url => Axios.get(url).then(parseResponse);

export const getFeatureFlags = () =>
  Axios.get(FEATURE_FLAG_SERVER_URL).then(parseResponse);
