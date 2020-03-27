import React from "react";
import ConfigProvider from "./ConfigProvider";
import FeatureFlagProvider from "./FeatureFlagProvider";

export default function({ children }) {
  return (
    <ConfigProvider>
      <FeatureFlagProvider>{children}</FeatureFlagProvider>
    </ConfigProvider>
  );
}
