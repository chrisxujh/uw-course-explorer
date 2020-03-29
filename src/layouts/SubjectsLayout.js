import React, { useEffect } from "react";
import SubjectsList from "../components/subjects/SubjectsList";
import { Typography, Container, Paper, makeStyles } from "@material-ui/core";
import Spinner from "../components/spinner/Spinner";
import { useConfig } from "../providers/ConfigProvider";
import { connect } from "react-redux";
import { subjectsIsLoadingSelector } from "../components/subjects/selectors";
import PropTypes from "prop-types";
import { getSubjects } from "../components/subjects/actions";
import CourseShortlist from "../components/courses/CourseShortlist";
import { getShortlistedCourses } from "../store/courses/actions";
import { shortlistedCoursesSelector } from "../store/courses/selectors";
import { userIsLoggedInSelector } from "../core/user/selectors";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  shortlist: {
    marginTop: theme.spacing(4)
  }
}));

const popularFilter = isPopular => ({ subject }) => isPopular[subject] === true;

const noPopularFilter = isPopular => ({ subject }) =>
  isPopular[subject] !== true;

const allFilter = () => true;

const SubjectsLayout = ({
  loading,
  getSubjects,
  shortlist,
  isLoggedIn,
  getShortlistedCourses
}) => {
  const { popularSubjects } = useConfig();
  const classes = useStyles();
  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  useEffect(() => {
    if (isLoggedIn) getShortlistedCourses();
  }, [getShortlistedCourses, isLoggedIn]);

  if (loading) return <Spinner />;

  const showPopular = popularSubjects !== undefined;
  const isPopular = {};
  if (showPopular) {
    popularSubjects.forEach(sub => (isPopular[sub] = true));
  }

  const otherFilter = showPopular ? noPopularFilter(isPopular) : allFilter;

  return (
    <Container>
      {shortlist && shortlist.length > 0 && (
        <div className={classes.shortlist}>
          <Typography variant="h5">Shortlisted courses:</Typography>
          <br />
          <CourseShortlist courses={shortlist} />
        </div>
      )}
      {showPopular && (
        <Paper variant="outlined" square className={classes.paper}>
          <Typography variant="h5">Popular subjects:</Typography>
          <SubjectsList filter={popularFilter(isPopular)} />
        </Paper>
      )}
      <Paper variant="outlined" square className={classes.paper}>
        <Typography variant="h5">Other subjects:</Typography>
        <SubjectsList filter={otherFilter} pagination={true} />
      </Paper>
    </Container>
  );
};

SubjectsLayout.propTypes = {
  loading: PropTypes.bool,
  shortlist: PropTypes.array,
  isLoggedIn: PropTypes.bool,

  getSubjects: PropTypes.func.isRequired,
  getShortlistedCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: subjectsIsLoadingSelector(state),
  shortlist: shortlistedCoursesSelector(state),
  isLoggedIn: userIsLoggedInSelector(state)
});

const mapDispatchToProps = {
  getSubjects,
  getShortlistedCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsLayout);
