import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { coursesSelector, coursesIsLoadingSelector } from "./selectors";
import Spinner from "../spinner/Spinner";
import { getCourses } from "./actions";
import {
  ListItem,
  ListItemText,
  List,
  makeStyles,
  Typography
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  link: {
    color: "#333",
    textDecoration: "none"
  }
}));

const CoursesList = ({ courses, loading, getCourses }) => {
  const classes = useStyles();
  const { subject } = useParams();
  useEffect(() => {
    getCourses(subject);
  }, [getCourses, subject]);

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

  return (
    <React.Fragment>
      {loading && <Spinner />}
      {!loading && coursesList.length === 0 && (
        <React.Fragment>
          <br />
          <Typography variant="body2" align="center">
            No course found.
          </Typography>
        </React.Fragment>
      )}
      {!loading && coursesList.length > 0 && <List>{coursesList}</List>}
    </React.Fragment>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,

  getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  courses: coursesSelector(state),
  loading: coursesIsLoadingSelector(state)
});

const mapDispatchToProps = {
  getCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
