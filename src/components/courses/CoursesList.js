import React from 'react';
import { connect } from 'react-redux';
import {
  coursesSelector,
  coursesIsLoadingSelector,
  unlockedCoursesMapSelector
} from '../../store/courses/selectors';
import Spinner from '../spinner/Spinner';
import { ListItem, ListItemText, makeStyles, Chip } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import MessageBanner from '../common/MessageBanner';
import PaginatedList from '../common/PaginatedList';
import { getCourseLink, useNavigation } from '../../utils/navigationUtils';
import DoneIcon from '@material-ui/icons/Done';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PropTypes from 'prop-types';
import { coursesTakenMapSelector } from '../../core/user/selectors';
import { getCourseCode } from '../../utils/utils';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
}));

const CoursesList = ({
  courses,
  loading,
  coursesTakenMap,
  unlockedCoursesMap
}) => {
  const classes = useStyles();
  const location = useLocation();
  const navigation = useNavigation();

  if (loading) return <Spinner />;

  if (courses.length === 0)
    return <MessageBanner message="No courses found." />;

  const params = new URLSearchParams(location.search);

  const onChangeRowsPerPage = rowsPerPage => {
    params.set('rowsPerPage', rowsPerPage);
    navigation.navigateTo(location.pathname, params);
  };

  const onPageChange = page => {
    params.set('page', page);
    navigation.navigateTo(location.pathname, params);
  };

  const renderCourse = (course, key) => {
    const chips = [];
    const courseCode = getCourseCode(course.subject, course.catalog_number);
    const isCourseTaken = Boolean(coursesTakenMap[courseCode]);
    const isCourseUnlocked = Boolean(unlockedCoursesMap[courseCode]);

    if (isCourseTaken) chips.push({ label: 'Taken', icon: <DoneIcon /> });
    if (!isCourseTaken && isCourseUnlocked)
      chips.push({
        label: 'Prereq Met',
        icon: <LockOpenIcon />,
        color: 'primary'
      });

    return (
      <Link key={key} className={classes.link} to={getCourseLink(course)}>
        <ListItem button>
          <ListItemText>
            {course.subject} {course.catalog_number} {course.title}
          </ListItemText>
          {chips.map(({ icon, label, color = 'default', className }) => (
            <Chip
              key={label}
              variant="outlined"
              size="small"
              icon={icon}
              label={label}
              color={color}
              className={className}
            />
          ))}
        </ListItem>
      </Link>
    );
  };

  return (
    <PaginatedList
      items={courses}
      currentPage={Number(params.get('page'))}
      rowsPerPage={Number(params.get('rowsPerPage'))}
      renderItem={renderCourse}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onPageChange={onPageChange}
    />
  );
};

CoursesList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
  coursesTakenMap: PropTypes.object.isRequired,
  unlockedCoursesMap: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courses: coursesSelector(state),
  loading: coursesIsLoadingSelector(state),
  coursesTakenMap: coursesTakenMapSelector(state),
  unlockedCoursesMap: unlockedCoursesMapSelector(state)
});

export default connect(mapStateToProps)(CoursesList);
