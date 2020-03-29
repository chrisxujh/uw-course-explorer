import React, { useEffect } from "react";
import AppBar from "./components/appBar/AppBar";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { getTerms } from "./core/term/actions";
import Footer from "./components/footer/Footer";
import NavigationBreadcrumb from "./components/navigation/NavigationBreadcrumb";
import { resumeUserSession } from "./core/user/actions";
import routeConfig from "./config/routeConfig";
import PropTypes from "prop-types";

const useStyle = makeStyles(theme => ({
  app: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    overflow: "hidden"
  },
  appContent: {
    height: "100%",
    overflowY: "scroll"
  },
  offset: theme.mixins.toolbar
}));

function App({ getTerms, resumeUserSession }) {
  const classes = useStyle();

  useEffect(() => {
    resumeUserSession();
  }, [resumeUserSession]);

  useEffect(() => {
    getTerms();
  }, [getTerms]);

  return (
    <div className={classes.app}>
      <BrowserRouter basename="/uw-course-explorer">
        <AppBar />
        <div className={classes.offset} />
        <div className={classes.appContent}>
          <Switch>
            {routeConfig.map((config, key) => {
              const {
                path,
                exact,
                redirectTo,
                breadcrumb,
                component: Component,
                props
              } = config;

              return (
                <Route key={key} exact={exact} path={path}>
                  {redirectTo ? (
                    <Redirect to={redirectTo} />
                  ) : (
                    <React.Fragment>
                      {breadcrumb && <NavigationBreadcrumb />}
                      <Component {...props} />
                    </React.Fragment>
                  )}
                </Route>
              );
            })}
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  getTerms: PropTypes.func.isRequired,
  resumeUserSession: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getTerms,
  resumeUserSession
};

export default connect(null, mapDispatchToProps)(App);
