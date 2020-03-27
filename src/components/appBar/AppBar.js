import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import { useFeatureFlags } from "../../providers/FeatureFlagProvider";
import SearchBar from "./SearchBar";

const useStyles = makeStyles(theme => ({
  toolbarWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftColumn: {
    display: "flex"
  },
  titleLink: {
    color: theme.palette.common.white,
    textDecoration: "none"
  },
  searchBarWrapper: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(8)
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const isSearchEnabled = useFeatureFlags().search;

  return (
    <AppBar elevation={0} square={true} position="fixed">
      <Toolbar>
        <div className={classes.toolbarWrapper}>
          <span>
            <Typography variant="h6">
              <Link className={classes.titleLink} to="/">
                UW Course Explorer
              </Link>
            </Typography>
          </span>
          <div className={classes.leftColumn}>
            {isSearchEnabled && (
              <div className={classes.searchBarWrapper}>
                <SearchBar />
              </div>
            )}
            <ProfileButton />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
