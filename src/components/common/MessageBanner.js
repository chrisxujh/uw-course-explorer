import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

const MessageBanner = ({ message }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.root} variant="body2" align="center">
      {message}
    </Typography>
  );
};

MessageBanner.propTypes = {
  message: PropTypes.string.isRequired
};

export default MessageBanner;
