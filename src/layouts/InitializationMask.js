import React from "react";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export default function() {
  const classes = useStyle();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
