import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { coursesSelector, coursesIsLoadingSelector } from "./selectors";
import Spinner from "../spinner/Spinner";
import { ListItem, ListItemText, List, makeStyles } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import MessageBanner from "../common/MessageBanner";

const useStyles = makeStyles(() => ({
  link: {
    color: "#333",
    textDecoration: "none"
  }
}));

const CoursesList = ({ courses, loading }) => {
  const classes = useStyles();
  const { subject } = useParams();

  if (loading) return <Spinner />;

  const coursesList = courses.map((course, key) => (
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
  ));

  if (coursesList.length === 0)
    return <MessageBanner message="No courses found." />;

  return <List>{coursesList}</List>;
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
