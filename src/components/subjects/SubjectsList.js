import React from "react";
import { connect } from "react-redux";
import { subjectsSelector, subjectsIsLoadingSelector } from "./selectors";
import ListItemText from "@material-ui/core/ListItemText";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import { makeStyles, ListItem } from "@material-ui/core";
import PaginatedList from "../common/PaginatedList";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}));

const SubjectsList = ({ subjects, loading, filter, pagination = false }) => {
  const classes = useStyles();

  if (loading) return <Spinner />;

  const filterUsed = filter instanceof Function ? filter : () => true;

  const renderSubject = (subject, key) => (
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
  );

  return (
    <PaginatedList
      items={subjects}
      renderItem={renderSubject}
      filter={filterUsed}
      pagination={pagination}
      rowsPerPage={[20, 30, 50, 100]}
    />
  );
};

SubjectsList.propTypes = {
  subjects: PropTypes.array,
  loading: PropTypes.bool,
  filter: PropTypes.func,
  pagination: PropTypes.bool
};

const mapStateToProps = state => ({
  subjects: subjectsSelector(state),
  loading: subjectsIsLoadingSelector(state)
});

export default connect(mapStateToProps)(SubjectsList);
