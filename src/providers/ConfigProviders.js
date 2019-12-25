import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchConfig } from "../core/config/actions";
import PropTypes from "prop-types";
import { configIsLoadingSelector } from "../core/config/selectors";
import { Backdrop, makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const ConfigProvider = ({ loading, children, fetchConfig }) => {
  const classes = useStyles();
  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  if (loading)
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return <React.Fragment>{children}</React.Fragment>;
};

ConfigProvider.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
  fetchConfig: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: configIsLoadingSelector(state)
});

const mapDispatchToProps = {
  fetchConfig
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigProvider);
