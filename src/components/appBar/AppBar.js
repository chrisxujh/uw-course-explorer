import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import { useFeatureFlags } from "../../providers/FeatureFlagProvider";
import SearchBar from "./SearchBar";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  titleLink: {
    color: theme.palette.common.white,
    textDecoration: "none"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const isSearchEnabled = useFeatureFlags().search;

  return (
    <AppBar elevation={0} square={true} position="fixed">
      <Toolbar>
        <Grid container>
          <Grid container item xs={2} alignItems="center">
            <Typography variant="h6">
              <Link className={classes.titleLink} to="/">
                UW Course Explorer
              </Link>
            </Typography>
          </Grid>
          <Grid container item xs={6} alignItems="center">
            {isSearchEnabled && (
              <div className={classes.searchBarWrapper}>
                <SearchBar />
              </div>
            )}
          </Grid>
          <Grid container item xs={4} alignItems="center" justify="flex-end">
            <ProfileButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
