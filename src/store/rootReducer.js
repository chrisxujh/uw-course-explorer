import { combineReducers } from "redux";
import subjects from "../components/subjects/reducers";
import courses from "../components/courses/reducers";
import course from "../components/course/reducers";
import term from "../core/term/reducers";

const rootReducer = combineReducers({ subjects, courses, course, term });

export default rootReducer;
