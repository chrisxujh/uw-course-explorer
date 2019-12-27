import Axios from "axios";
import { serviceUnavailableError, networkError } from "../core/error/actions";

export default function(store) {
  Axios.interceptors.response.use(
    res => res,
    error => {
      console.error(error);
      const { response } = error;
      let returnError = error;

      if (!response) {
        returnError = new Error(
          "Oops... we couldn't reach the server. You might be offline."
        );
        store.dispatch(networkError(returnError));
      }

      if (response) {
        const { status } = response;
        switch (status) {
          case 500:
          case 503:
            returnError = new Error(
              "Service is unavailable. Please try again later."
            );
            store.dispatch(serviceUnavailableError(returnError));
            break;

          default:
            break;
        }
      }

      return Promise.reject(returnError);
    }
  );
}
