import React from 'react';
import { connect } from 'react-redux';
import {
  coursesSelector,
  coursesIsLoadingSelector
} from '../../store/courses/selectors';
import Spinner from '../spinner/Spinner';
import { ListItem, ListItemText, makeStyles, Chip } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import MessageBanner from '../common/MessageBanner';
import PaginatedList from '../common/PaginatedList';
import { getCourseLink, useNavigation } from '../../utils/navigationUtils';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';
import { coursesTakenMapSelector } from '../../core/user/selectors';
import { getCourseCode } from '../../utils/utils';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
}));

const CoursesList = ({ courses, loading, coursesTakenMap }) => {
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
    const isCourseTaken =
      coursesTakenMap[getCourseCode(course.subject, course.catalog_number)];

    return (
      <Link key={key} className={classes.link} to={getCourseLink(course)}>
        <ListItem button>
          <ListItemText>
            {course.subject} {course.catalog_number} {course.title}
          </ListItemText>
          {isCourseTaken && (
            <Chip
              variant="outlined"
              size="small"
              icon={<DoneIcon />}
              label="Taken"
              color="primary"
            />
          )}
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
  coursesTakenMap: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courses: coursesSelector(state),
  loading: coursesIsLoadingSelector(state),
  coursesTakenMap: coursesTakenMapSelector(state)
});

export default connect(mapStateToProps)(CoursesList);
