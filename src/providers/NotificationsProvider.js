import React, { useEffect } from "react";
import { connect } from "react-redux";
import { errorMessageSelector } from "../core/error/selectors";
import { SnackbarProvider, useSnackbar } from "notistack";
import PropTypes from "prop-types";

const Notifications = ({ errorMessage }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errorMessage !== null)
      enqueueSnackbar(errorMessage, { variant: "error" });
  }, [enqueueSnackbar, errorMessage]);

  return <div />;
};

const mapStateToProps = state => ({
  errorMessage: errorMessageSelector(state)
});

Notifications.propTypes = {
  errorMessage: PropTypes.string
};

const NotificationsConnected = connect(mapStateToProps)(Notifications);

export default function({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
    >
      {children}
      <NotificationsConnected />
    </SnackbarProvider>
  );
}
