import React, { useEffect } from "react";
import { connect } from "react-redux";
import { subjectsSelector, subjectsIsLoadingSelector } from "./selectors";
import { getSubjects } from "./actions";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  link: {
    color: "#333",
    textDecoration: "none"
  }
}));

const SubjectsList = ({ subjects, loading, getSubjects }) => {
  const classes = useStyles();
  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const subjectsList = subjects.map((subject, key) => (
    <Link
      key={key}
      className={classes.link}
      to={`/subjects/${subject.subject}`}
    >
      <ListItem button>
        <ListItemText>
          <h4>{subject.subject}</h4>
          <small>{subject.description}</small>
        </ListItemText>
      </ListItem>
    </Link>
  ));

  return (
    <div>
      <List>{loading ? <Spinner /> : subjectsList}</List>
    </div>
  );
};

SubjectsList.propTypes = {
  subjects: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
  loading: subjectsIsLoadingSelector(state)
});

const mapDispatchToProps = { getSubjects };

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsList);
