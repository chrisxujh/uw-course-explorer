import React, { useEffect } from "react";
import AppBar from "./components/appBar/AppBar";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { makeStyles, Container } from "@material-ui/core";
import { connect } from "react-redux";
import { getTerms } from "./core/term/actions";
import Footer from "./components/footer/Footer";
import NavigationBreadcrumb from "./components/navigation/NavigationBreadcrumb";
import { resumeUserSession } from "./core/user/actions";
import routeConfig from "./config/routeConfig";
import PropTypes from "prop-types";
import "./App.css";

const useStyle = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4)
  }
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
    <div className="App">
      <Container className={classes.container} maxWidth="lg">
        <BrowserRouter basename="/uw-course-explorer">
          <AppBar />
          <div className={classes.offset} />
          <Switch>
            {routeConfig.map((config, key) => {
              const {
                path,
                exact,
                redirectTo,
                breadcrumb,
                component: Component
              } = config;

              return (
                <Route key={key} exact={exact} path={path}>
                  {redirectTo ? (
                    <Redirect to={redirectTo} />
                  ) : (
                    <React.Fragment>
                      {breadcrumb && <NavigationBreadcrumb />}
                      <Component />
                    </React.Fragment>
                  )}
                </Route>
              );
            })}
          </Switch>
          <Footer />
        </BrowserRouter>
      </Container>
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
