import React, { useEffect } from "react";
import SubjectsList from "../components/subjects/SubjectsList";
import { Typography } from "@material-ui/core";
import Spinner from "../components/spinner/Spinner";
import { useConfig } from "../providers/ConfigProvider";
import { connect } from "react-redux";
import { subjectsIsLoadingSelector } from "../components/subjects/selectors";
import PropTypes from "prop-types";
import { getSubjects } from "../components/subjects/actions";

const popularFilter = isPopular => ({ subject }) => isPopular[subject] === true;

const noPopularFilter = isPopular => ({ subject }) =>
  isPopular[subject] !== true;

const allFilter = () => true;

const SubjectsLayout = ({ loading, getSubjects }) => {
  const { popularSubjects } = useConfig();
  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  if (loading) return <Spinner />;

  const showPopular = popularSubjects !== undefined;
  const isPopular = {};
  if (showPopular) {
    popularSubjects.forEach(sub => (isPopular[sub] = true));
  }

  const otherFilter = showPopular ? noPopularFilter(isPopular) : allFilter;

  return (
    <React.Fragment>
      {showPopular && (
        <React.Fragment>
          <Typography variant="h5">Popular subjects:</Typography>
          <SubjectsList filter={popularFilter(isPopular)} />
          <br />
        </React.Fragment>
      )}
      <Typography variant="h5">Other subjects:</Typography>
      <SubjectsList filter={otherFilter} pagination={true} />
    </React.Fragment>
  );
};

SubjectsLayout.propTypes = {
  loading: PropTypes.bool,
  getSubjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: subjectsIsLoadingSelector(state)
});

const mapDispatchToProps = {
  getSubjects
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsLayout);
