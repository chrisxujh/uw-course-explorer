import { all, fork } from "redux-saga/effects";
import subjects from "../components/subjects/sagas";
import courses from "../components/courses/sagas";
import course from "../components/course/sagas";

export default function*() {
  yield all([fork(subjects), fork(courses), fork(course)]);
}
