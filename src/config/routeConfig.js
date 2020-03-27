import CoursePage from "../components/course/CoursePage";
import CoursesListLayout from "../layouts/CoursesListLayout";
import SubjectsLayout from "../layouts/SubjectsLayout";
import ResultsLayout from "../layouts/ResultLayout";

const routeConfig = [
  {
    path: "/subjects/:subject/:catalogNumber",
    component: CoursePage,
    breadcrumb: true
  },
  {
    path: "/subjects/:subject",
    component: CoursesListLayout,
    breadcrumb: true
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
