import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSearchResult } from "../store/search/actions";
import Spinner from "../components/spinner/Spinner";
import PropTypes from "prop-types";
import {
  searchResultsIsLoadingSelector,
  searchResultsSelector
} from "../store/search/selectors";
import PaginatedList from "../components/common/PaginatedList";
import {
  makeStyles,
  Divider,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import MessageBanner from "../components/common/MessageBanner";
import { getCourseLink } from "../utils/navigationUtils";

const useStyles = makeStyles(theme => ({
  result: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  }
}));

const ResultsLayout = ({ isLoading, getSearchResult, results }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const classes = useStyles();

  useEffect(() => {
    getSearchResult({ query });
  }, [getSearchResult, query]);

  const renderResultItem = (result, i) => {
    const { type, item } = result;
    let url;
    let content = null;

    if (type === "subject") {
      url = `/subjects/${item.subject}`;
      content = (
        <ListItemText>
          <p>{item.subject}</p>
          <small>{item.description}</small>
        </ListItemText>
      );
    } else if (type === "course") {
      url = getCourseLink(item);
      content = (
        <ListItemText>
          <p>{`${item.subject} ${item.catalog_number}`}</p>
          <small>{item.title}</small>
        </ListItemText>
      );
    }

    return (
      <React.Fragment>
        {i !== 0 && <Divider light />}
        <Link to={url} className={classes.result}>
          <ListItem button>{content}</ListItem>
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (isLoading) return <Spinner />;
    if (results.length === 0)
      return <MessageBanner message="No results found." />;

    return (
      <PaginatedList
        items={results}
        renderItem={renderResultItem}
        rowsPerPageOptions={[6, 15, 30, 50]}
      />
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h5">
        Search results for: <b>{query}</b>
      </Typography>
      <br />
      {renderContent()}
    </React.Fragment>
  );
};

ResultsLayout.defaultProps = {
  results: []
};

ResultsLayout.propTypes = {
  isLoading: PropTypes.bool,
  getSearchResult: PropTypes.func.isRequired,
  results: PropTypes.array
};

const mapStateToProps = state => ({
  isLoading: searchResultsIsLoadingSelector(state),
  results: searchResultsSelector(state)
});

const mapDispatchToProps = {
  getSearchResult
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsLayout);
