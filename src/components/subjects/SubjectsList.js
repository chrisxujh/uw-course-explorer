import React from "react";
import { connect } from "react-redux";
import { subjectsSelector, subjectsIsLoadingSelector } from "./selectors";
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

const SubjectsList = ({ subjects, loading, filter }) => {
  const classes = useStyles();

  if (loading) return <Spinner />;

  const filterUsed = filter instanceof Function ? filter : () => true;
  const subjectsList = subjects.filter(filterUsed).map((subject, key) => (
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

  return <List>{subjectsList}</List>;
};

SubjectsList.propTypes = {
  subjects: PropTypes.array,
  loading: PropTypes.bool,
  filter: PropTypes.func
};

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
  loading: subjectsIsLoadingSelector(state)
});

export default connect(mapStateToProps)(SubjectsList);
