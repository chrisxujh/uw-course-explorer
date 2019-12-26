import React from "react";
import ConfigProvider from "./ConfigProvider";
import OAuthProvider from "./OAuthProvider";
import FeatureFlagProvider from "./FeatureFlagProvider";

export default function({ children }) {
  return (
    <ConfigProvider>
      <FeatureFlagProvider>
        <OAuthProvider>{children}</OAuthProvider>
      </FeatureFlagProvider>
    </ConfigProvider>
  );
}
