import React from "react";
import ConfigProvider from "./ConfigProvider";
import PropTypes from "prop-types";

const InitializationProvider = ({ children, onReady }) => (
  <ConfigProvider onReady={onReady}>{children}</ConfigProvider>
);

InitializationProvider.propTypes = {
  children: PropTypes.any,
  onReady: PropTypes.func
};

export default InitializationProvider;
