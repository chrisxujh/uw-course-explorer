import { httpAuthGet, httpAuthPost } from "../http/httpService";
import { SERVER_URL } from "../../../config/config";

export const checkLoginStatus = () => httpAuthGet(`${SERVER_URL}/user/status`);

export const getUserInfo = () => httpAuthGet(`${SERVER_URL}/user`);

export const doOAuth = (provider, access_token) =>
  httpAuthPost(`${SERVER_URL}/user/oauth`, {
    provider,
    access_token
  });
