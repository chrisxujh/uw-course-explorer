import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../store/rootSaga";
import { ENV } from "./config";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const composeEnhancers =
    ENV === "dev"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
