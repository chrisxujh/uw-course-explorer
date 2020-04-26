import { courseActionTypes } from '../components/course/actions';
import { errorActionTypes } from '../core/error/actions';
import { userActionTypes } from '../core/user/actions';

const notificationConfig = {
  [courseActionTypes.SHORTLIST_COURSE_SUCCESS]: {
    message: 'Pinned course!',
    variant: 'success'
  },
  [courseActionTypes.UNSHORTLIST_COURSE_SUCCESS]: {
    message: 'Unpinned course!',
    variant: 'success'
  },
  [errorActionTypes.NETWORK_ERROR]: {
    message: 'Network error',
    variant: 'error'
  },
  [userActionTypes.LOG_OUT_SUCCESS]: {
    message: 'Logged out successfully!',
    variant: 'success'
  },
  [courseActionTypes.MARK_COURSE_TAKEN_SUCCESS]: {
    message: 'Marked as taken!',
    variant: 'success'
  },
  [courseActionTypes.UN_MARK_COURSE_TAKEN_SUCCESS]: {
    message: 'Marked as not taken!',
    variant: 'success'
  }
};

export default notificationConfig;
