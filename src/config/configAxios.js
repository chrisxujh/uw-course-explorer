import Axios from "axios";
import { serviceUnavailableError, networkError } from "../core/error/actions";

export default function(store) {
  Axios.interceptors.response.use(
    res => res,
    error => {
      const { response } = error;

      if (!response) {
        store.dispatch(networkError(error));
      } else {
        const { status } = response;
        switch (status) {
          case 500:
          case 503:
            store.dispatch(serviceUnavailableError(error));
            break;
          default:
            break;
        }
      }

      return Promise.reject(error);
    }
  );
}
