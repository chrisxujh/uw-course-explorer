import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./config/configureStore";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import configAxios from "./config/configAxios";
import ConfigProviders from "./providers/ConfigProviders";

const store = configureStore();
configAxios(store);

ReactDOM.render(
  <Provider store={store}>
    <ConfigProviders>
      <App />
    </ConfigProviders>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
