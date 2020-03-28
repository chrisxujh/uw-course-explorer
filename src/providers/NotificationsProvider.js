import React, { useEffect } from "react";
import { connect } from "react-redux";
import { notificationsSelector } from "../core/notifications/selectors";
import { SnackbarProvider, useSnackbar } from "notistack";
import PropTypes from "prop-types";

const displayed = new Map();

const NotificationsProvider = props => {
  const { children, notifications } = props;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notifications.length) {
      const { id, message, ...rest } = notifications.pop();

      if (!displayed.has(id)) {
        enqueueSnackbar(message, {
          autoHideDuration: 4000,
          preventDuplicate: true,
          ...rest
        });
        displayed.set(id, true);
      }
    }
  }, [enqueueSnackbar, notifications]);

  return <React.Fragment>{children}</React.Fragment>;
};

NotificationsProvider.propTypes = {
  children: PropTypes.node,
  notifications: PropTypes.array
};

const mapStateToProps = state => ({
  notifications: notificationsSelector(state)
});

const NotificationsProviderConnected = connect(mapStateToProps)(
  NotificationsProvider
);

export default function({ children }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <NotificationsProviderConnected>
        {children}
      </NotificationsProviderConnected>
    </SnackbarProvider>
  );
}
