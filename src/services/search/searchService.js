import { SERVER_URL } from "../../config/config";
import { httpGet } from "../../core/services/http/httpService";

export const querySearch = query =>
  httpGet(`${SERVER_URL}/search?query=${query}`);
