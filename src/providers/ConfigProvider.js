import React, { useContext, useEffect, useState } from "react";
import { getConfig } from "../core/services/config/configService";
import { configList } from "../config/config";

const ConfigContext = React.createContext({});

export const useConfig = () => useContext(ConfigContext);

export default function({ children }) {
  const [config, setConfig] = useState({});

  useEffect(() => {
    Promise.all(
      configList.map(({ key, url }) =>
        getConfig(url).then(result => setConfig({ ...config, [key]: result }))
      )
    );
  }, [config]);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
