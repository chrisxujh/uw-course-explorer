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
  Typography,
  Container,
  Paper
} from "@material-ui/core";
import MessageBanner from "../components/common/MessageBanner";
import { getCourseLink, useNavigation } from "../utils/navigationUtils";

const useStyles = makeStyles(theme => ({
  result: {
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  wrapper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  }
}));

const ResultsLayout = props => {
  const classes = useStyles();
  const location = useLocation();
  const navigation = useNavigation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const { isLoading, getSearchResult, results } = props;

  useEffect(() => {
    getSearchResult({ query });
  }, [getSearchResult, query]);

  const onPageChange = page => {
    queryParams.set("page", page);
    navigation.navigateTo(location.pathname, queryParams);
  };

  const onChangeRowsPerPage = rowsPerPage => {
    queryParams.set("rowsPerPage", rowsPerPage);
    navigation.navigateTo(location.pathname, queryParams);
  };

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
      <React.Fragment key={i}>
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
        currentPage={Number(queryParams.get("page"))}
        rowsPerPage={Number(queryParams.get("rowsPerPage"))}
        onPageChange={onPageChange}
        onChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 30, 50]}
      />
    );
  };

  return (
    <Container>
      <Paper variant="outlined" square className={classes.wrapper}>
        <Typography variant="h5">
          Search results for: <b>{query}</b>
        </Typography>
        <br />
        {renderContent()}
      </Paper>
    </Container>
  );
};

ResultsLayout.defaultProps = {
  results: []
};

ResultsLayout.propTypes = {
  isLoading: PropTypes.bool,
  results: PropTypes.array,
  getSearchResult: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: searchResultsIsLoadingSelector(state),
  results: searchResultsSelector(state)
});

const mapDispatchToProps = {
  getSearchResult
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsLayout);
