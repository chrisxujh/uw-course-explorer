import CourseLayout from '../layouts/CourseLayout';
import CoursesListLayout from '../layouts/CoursesListLayout';
import SubjectsLayout from '../layouts/SubjectsLayout';
import ResultsLayout from '../layouts/ResultLayout';
import NotFoundPage from '../layouts/NotFoundPage';
import ProfileLayout from '../layouts/ProfileLayout';

const routeConfig = [
  {
    path: '/subjects/:subject/:catalogNumber',
    component: CourseLayout
  },
  {
    path: '/subjects/:subject',
    component: CoursesListLayout
  },
  {
    path: '/subjects',
    component: SubjectsLayout
  },
  {
    path: '/results',
    component: ResultsLayout
  },
  {
    path: '/profile',
    component: ProfileLayout
  },
  { path: '/', exact: true, redirectTo: '/subjects' },
  { path: '**', component: NotFoundPage }
];

export default routeConfig;
