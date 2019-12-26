import React, { useContext, useEffect, useState } from "react";
import { getFeatureFlags } from "../core/services/config/configService";

const FeatureFlagContext = React.createContext({});

export const useFeatureFlags = () => useContext(FeatureFlagContext);

export default function({ children }) {
  const [featureFlags, setFeatureFlags] = useState({});

  useEffect(() => {
    getFeatureFlags()
      .then(flags => setFeatureFlags(flags))
      .catch(console.error);
  }, []);

  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
