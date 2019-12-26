import React, { useContext, useEffect } from "react";
import { getFeatureFlags } from "../core/services/config/configService";

const featureFlags = {};
const featureFlagContext = React.createContext(featureFlags);

export const useFeatureFlags = () => useContext(featureFlagContext);

export default function({ children, onReady }) {
  useEffect(() => {
    getFeatureFlags()
      .then(flags =>
        Object.keys(flags).forEach(key => {
          featureFlags[key] = flags[key];
        })
      )
      .then(() => onReady instanceof Function && onReady())
      .catch(console.error);
  }, [onReady]);

  return <React.Fragment>{children}</React.Fragment>;
}
