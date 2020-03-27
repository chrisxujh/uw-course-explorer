import React, { useState } from "react";
import { makeStyles, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const useInputBaseStyles = makeStyles(() => ({
  root: {
    minWidth: "250px",

    "& .MuiInputBase-input": {
      color: "#fff",
      fontSize: "0.875rem",
      textIndent: "1em"
    }
  }
}));

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: "rgba(225,225,225,0.1)",
    borderRadius: "4px",
    padding: "0 2px"
  },
  searchIcon: {
    color: "#fff"
  }
}));

export default function SearchBar() {
  const classes = useStyles();
  const history = useHistory();
  const [query, setQuery] = useState("");
  const inputBaseClasses = useInputBaseStyles();

  const onSearch = () => history.push(`/results?query=${query}`);
  const onInputChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const onKeyDown = e => e.keyCode === 13 && onSearch();

  return (
    <div className={classes.wrapper}>
      <InputBase
        classes={inputBaseClasses}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      <IconButton
        type="submit"
        size="small"
        className={classes.iconButton}
        aria-label="search"
        onClick={onSearch}
      >
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
    </div>
  );
}
