import React, { useContext, useEffect, useState } from "react";
import { getConfig } from "../core/services/config/configService";
import { configList } from "../config/config";

const ConfigContext = React.createContext({});

export const useConfig = () => useContext(ConfigContext);

export default function({ children }) {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const newConfig = {};

    Promise.all(
      configList.map(({ key, url }) =>
        getConfig(url).then(result => (newConfig[key] = result))
      )
    )
      .then(() => setConfig(newConfig))
      .catch(console.error);
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
