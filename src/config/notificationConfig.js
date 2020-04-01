import { courseActionTypes } from "../components/course/actions";
import { errorActionTypes } from "../core/error/actions";
import { userActionTypes } from "../core/user/actions";

const notificationConfig = {
  [courseActionTypes.SHORTLIST_COURSE_SUCCESS]: {
    message: "Pinned course successfully!",
    variant: "success"
  },
  [courseActionTypes.UNSHORTLIST_COURSE_SUCCESS]: {
    message: "Removed from pinned list!",
    variant: "success"
  },
  [errorActionTypes.NETWORK_ERROR]: {
    message: "Network error",
    variant: "error"
  },
  [userActionTypes.LOG_OUT_SUCCESS]: {
    message: "Logged out successfully!",
    variant: "success"
  }
};

export default notificationConfig;
