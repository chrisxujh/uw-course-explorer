import React, { useContext, useState } from "react";
import { getConfig } from "../core/services/config/configService";
import { configList } from "../config/config";
import PropTypes from "prop-types";

const config = {};
const ConfigContext = React.createContext(config);

const ConfigProvider = ({ children, onReady }) => {
  useState(() => {
    Promise.all(
      configList.map(({ key, url }) =>
        getConfig(url).then(result => (config[key] = result))
      )
    ).then(() => {
      if (onReady instanceof Function) onReady();
    });
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any,
  onReady: PropTypes.func
};

export const useConfig = () => useContext(ConfigContext);

export default ConfigProvider;
