import React from "react";
import { connect } from "react-redux";
import { coursesSelector, coursesIsLoadingSelector } from "./selectors";
import Spinner from "../spinner/Spinner";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import MessageBanner from "../common/MessageBanner";
import PaginatedList from "../common/PaginatedList";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  }
}));

const CoursesList = ({ courses, loading }) => {
  const classes = useStyles();
  const { subject } = useParams();

  if (loading) return <Spinner />;

  if (courses.length === 0)
    return <MessageBanner message="No courses found." />;

  const renderCourse = (course, key) => (
    <Link
      key={key}
      className={classes.link}
      to={`/subjects/${subject}/${course.course_id}`}
    >
      <ListItem button>
        <ListItemText>
          {course.subject} {course.catalog_number} {course.title}
        </ListItemText>
      </ListItem>
    </Link>
  );

  return <PaginatedList items={courses} renderItem={renderCourse} />;
};

CoursesList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  courses: coursesSelector(state),
  loading: coursesIsLoadingSelector(state)
});

export default connect(mapStateToProps)(CoursesList);
