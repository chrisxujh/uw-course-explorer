import { combineReducers } from "redux";
import subjects from "../components/subjects/reducers";
import courses from "../components/courses/reducers";
import course from "../components/course/reducers";
import search from "./search/reducers";

// core
import term from "../core/term/reducers";
import user from "../core/user/reducers";
import notifications from "../core/notifications/reducers";

const rootReducer = combineReducers({
  subjects,
  courses,
  course,
  term,
  user,
  notifications,
  search
});

export default rootReducer;
