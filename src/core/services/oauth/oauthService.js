import Axios from "axios";
import { SERVER_URL } from "../../../config/config";

export const doOAuth = (provider, access_token) =>
  Axios.post(
    `${SERVER_URL}/user/oauth`,
    {
      provider,
      access_token
    },
    {
      withCredentials: true
    }
  ).then(res => res.data);
