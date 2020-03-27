import React, { useState } from "react";
import { makeStyles, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigation } from "../../utils/navigationUtils";

const useInputBaseStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    minWidth: theme.spacing(22),
    transition: theme.transitions.create("min-width"),

    "&.Mui-focused": {
      minWidth: theme.spacing(28)
    },

    "& .MuiInputBase-input": {
      color: theme.palette.common.white,
      fontSize: "0.875rem",
      textIndent: theme.spacing(2)
    }
  }
}));

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    backgroundColor: "rgba(225,225,225,0.1)",
    borderRadius: theme.shape.borderRadius
  },
  searchIcon: {
    color: theme.palette.common.white
  }
}));

export default function SearchBar() {
  const classes = useStyles();
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const inputBaseClasses = useInputBaseStyles();

  const onSearch = () => navigation.navigateTo(`/results?query=${query}`);
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
