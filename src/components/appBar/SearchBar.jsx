import React, { useState, useEffect } from "react";
import {
  InputBase,
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClassIcon from "@material-ui/icons/Class";
import ListIcon from "@material-ui/icons/List";
import SubjectIcon from "@material-ui/icons/Subject";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCourseLink,
  getSubjectLink,
  getResultsPageLink,
  getSubjectsPageLink,
  useNavigation
} from "../../utils/navigationUtils";
import { Link } from "react-router-dom";
import { getSearchResult, clearSearchResult } from "../../store/search/actions";
import { searchResultsSelector } from "../../store/search/selectors";

const MAX_ENTRIES = 6;

const useStyles = makeStyles(theme => ({
  searchIcon: {
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  inputContainer: {
    outline: "none",
    backgroundColor: "rgba(225,225,225,0.1)"
  },
  inputBase: {
    flex: 1,
    height: theme.spacing(5),
    color: theme.palette.common.white,
    width: theme.spacing(60)
  },
  container: {
    position: "relative",
    outline: "none"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  resultsSection: {
    position: "absolute",
    zIndex: theme.zIndex.drawer,
    width: "100%",
    marginTop: theme.spacing(0.5)
  },
  hidden: {
    height: 0,
    overflow: "hidden"
  }
}));

const SearchBar = props => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const { navigateTo } = useNavigation();

  const { results, getSearchResult, clearSearchResult } = props;

  useEffect(() => {
    if (input) {
      getSearchResult({ query: input, count: MAX_ENTRIES });
    } else {
      clearSearchResult();
    }
  }, [clearSearchResult, getSearchResult, input]);

  useEffect(() => () => clearSearchResult(), [clearSearchResult]);

  const handleInputChange = e => setInput(e.target.value);

  const handleSelect = () => {
    setFocused(false);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      navigateTo(getResultsPageLink(input));
      handleSelect();
    }
  };

  return (
    <div
      className={classes.container}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className={classes.inputContainer}>
        <Box display="flex" alignItems="center">
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={classes.inputBase}
            placeholder="Search for courses or subjects…"
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
      </div>
      <div className={focused ? classes.resultsSection : classes.hidden}>
        <Paper square>
          <List>
            {results.slice(0, MAX_ENTRIES).map(result => {
              const { type, item } = result;
              let icon = null;
              let text = null;
              let link = null;

              if (type === "course") {
                link = getCourseLink(item);
                icon = <ClassIcon />;
                text = (
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      <b>
                        {item.subject}&nbsp;{item.catalog_number}
                      </b>
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      &nbsp;&#124;&nbsp;{item.title}
                    </Typography>
                  </React.Fragment>
                );
              } else if (type === "subject") {
                link = getSubjectLink(item);
                icon = <SubjectIcon />;
                text = (
                  <React.Fragment>
                    <Typography component="span" color="textPrimary">
                      <b>{item.subject}</b>
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      &nbsp;&#124;&nbsp;{item.description}
                    </Typography>
                  </React.Fragment>
                );
              }

              return (
                <Link
                  key={result.refIndex}
                  to={link}
                  className={classes.link}
                  onClick={handleSelect}
                >
                  <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </ListItem>
                </Link>
              );
            })}
            {results.length > 0 && (
              <Link
                to={getResultsPageLink(input)}
                className={classes.link}
                onClick={handleSelect}
              >
                <ListItem button>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography color="textPrimary">
                      {`See all results for "${input}"`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </Link>
            )}
            <Link
              to={getSubjectsPageLink()}
              className={classes.link}
              onClick={handleSelect}
            >
              <ListItem button>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography color="primary">Explore all subjects</Typography>
                </ListItemText>
              </ListItem>
            </Link>
          </List>
        </Paper>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  results: PropTypes.array,
  getSearchResult: PropTypes.func.isRequired,
  clearSearchResult: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  results: searchResultsSelector(state)
});

const mapDispatchToProps = {
  getSearchResult,
  clearSearchResult
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
