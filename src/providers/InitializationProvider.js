import React, { useState } from "react";
import ConfigProvider from "./ConfigProvider";
import PropTypes from "prop-types";
import OAuthProvider from "./OAuthProvider";
import FeatureFlagProvider from "./FeatureFlagProvider";

const InitializationProvider = ({ children, onReady }) => {
  const [configReady, setConfigReady] = useState(false);
  const [featureFlagReady, setFeatureFlagReady] = useState(false);

  const checkReady = () => {
    if (configReady && featureFlagReady && onReady instanceof Function)
      onReady();
  };

  const onConfigReady = () => {
    setConfigReady(true);
    checkReady();
  };

  const onFeatureFlagReady = () => {
    setFeatureFlagReady(true);
    checkReady();
  };

  return (
    <ConfigProvider onReady={onConfigReady}>
      <FeatureFlagProvider onReady={onFeatureFlagReady}>
        <OAuthProvider>{children}</OAuthProvider>
      </FeatureFlagProvider>
    </ConfigProvider>
  );
};

InitializationProvider.propTypes = {
  children: PropTypes.any,
  onReady: PropTypes.func
};

export default InitializationProvider;
