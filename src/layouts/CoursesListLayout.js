import React, { useEffect } from "react";
import CoursesList from "../components/courses/CoursesList";
import { Typography, Container, Paper, makeStyles } from "@material-ui/core";
import Spinner from "../components/spinner/Spinner";
import NavigationBreadcrumb from "../components/navigation/NavigationBreadcrumb";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { coursesIsLoadingSelector } from "../components/courses/selectors";
import { getCourses } from "../components/courses/actions";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    paddingTop: 0
  }
}));

const CoursesListLayout = ({ loading, getCourses }) => {
  const { subject } = useParams();
  const classes = useStyles();

  useEffect(() => {
    getCourses(subject);
  }, [getCourses, subject]);

  if (loading) return <Spinner />;

  return (
    <Container>
      <Paper variant="outlined" square className={classes.wrapper}>
        <NavigationBreadcrumb />
        <Typography variant="h5">Courses of {subject}:</Typography>
        <CoursesList />
      </Paper>
    </Container>
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
