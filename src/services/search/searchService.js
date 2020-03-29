import { SERVER_URL } from "../../config/config";
import { httpGet } from "../../core/services/http/httpService";

export const querySearch = ({ query, count }) => {
  const params = new URLSearchParams({ query });
  if (count) params.set("count", count);

  return httpGet(`${SERVER_URL}/search?${params.toString()}`);
};
