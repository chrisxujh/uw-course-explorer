import React, { useEffect } from "react";
import CoursesList from "../components/courses/CoursesList";
import { Typography } from "@material-ui/core";
import Spinner from "../components/spinner/Spinner";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { coursesIsLoadingSelector } from "../components/courses/selectors";
import { getCourses } from "../components/courses/actions";
import PropTypes from "prop-types";

const CoursesListLayout = ({ loading, getCourses }) => {
  const { subject } = useParams();
  useEffect(() => {
    getCourses(subject);
  }, [getCourses, subject]);

  if (loading) return <Spinner />;

  return (
    <React.Fragment>
      <Typography variant="h5">Courses of {subject}:</Typography>
      <CoursesList />
    </React.Fragment>
  );
};

CoursesListLayout.propTypes = {
  loading: PropTypes.bool,
  getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: coursesIsLoadingSelector(state)
});

const mapDispatchToProps = {
  getCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesListLayout);
