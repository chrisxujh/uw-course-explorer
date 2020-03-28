import CourseLayout from "../layouts/CourseLayout";
import CoursesListLayout from "../layouts/CoursesListLayout";
import SubjectsLayout from "../layouts/SubjectsLayout";
import ResultsLayout from "../layouts/ResultLayout";

const routeConfig = [
  {
    path: "/subjects/:subject/:catalogNumber",
    component: CourseLayout
  },
  {
    path: "/subjects/:subject",
    component: CoursesListLayout
  },
  {
    path: "/subjects",
    component: SubjectsLayout
  },
  {
    path: "/results",
    component: ResultsLayout
  },
  { path: "/", exact: true, redirectTo: "/subjects" }
];

export default routeConfig;
