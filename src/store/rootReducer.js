import { combineReducers } from "redux";
import subjects from "../components/subjects/reducers";
import courses from "../components/courses/reducers";
import course from "../components/course/reducers";

const rootReducer = combineReducers({ subjects, courses, course });

export default rootReducer;
