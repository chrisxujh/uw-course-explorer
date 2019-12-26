import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  titleLink: {
    color: "#fff",
    textDecoration: "none"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <Link className={classes.titleLink} to="/">
              UW Course Explorer
            </Link>
          </Typography>
          <ProfileButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
