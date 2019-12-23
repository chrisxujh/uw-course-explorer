import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../store/rootSaga";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
