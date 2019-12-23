import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { courseIsLoadingSelector, courseSelector } from "./selectors";
import { getCourseById } from "./actions";
import Spinner from "../spinner/Spinner";
import { useParams } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const CoursePage = ({ loading, course, getCourseById }) => {
  const classes = useStyles();
  const { courseId } = useParams();
  useEffect(() => {
    getCourseById(courseId);
  }, [courseId, getCourseById]);

  return (
    <div className={classes.root}>
      {loading && <Spinner />}
      {!loading && course && (
        <div>
          <Typography variant="h4" gutterBottom>
            {course.subject} {course.catalog_number} {course.title}
          </Typography>
          <Typography variant="subtitle1">{course.description}</Typography>
        </div>
      )}
    </div>
  );
};

CoursePage.propTypes = {
  loading: PropTypes.bool,
  course: PropTypes.object,

  getCourseById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: courseIsLoadingSelector(state),
  course: courseSelector(state)
});

const mapDispatchToProps = {
  getCourseById
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
