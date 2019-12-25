import React, { useEffect, useState } from "react";
import AppBar from "./components/appBar/AppBar";
import CoursePage from "./components/course/CoursePage";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { makeStyles, Container } from "@material-ui/core";
import SubjectsLayout from "./layouts/SubjectsLayout";
import CoursesListLayout from "./layouts/CoursesListLayout";
import { connect } from "react-redux";
import { getTerms } from "./core/term/actions";
import PropTypes from "prop-types";
import Footer from "./components/footer/Footer";
import NotificationsProvider from "./providers/NotificationsProvider";
import InitializationProvider from "./providers/InitializationProvider";
import InitializationMask from "./layouts/InitializationMask";
import "./App.css";

const useStyle = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4)
  }
}));

function App({ getTerms }) {
  const classes = useStyle();
  useEffect(() => {
    getTerms();
  }, [getTerms]);
  const [ready, setReady] = useState(false);
  const onInitialized = () => setReady(true);

  return (
    <div className="App">
      <InitializationProvider onReady={onInitialized}>
        {!ready && <InitializationMask />}
        {ready && (
          <NotificationsProvider>
            <Container className={classes.container} maxWidth="lg">
              <BrowserRouter basename="/uw-course-explorer">
                <AppBar />
                <div className={classes.offset} />
                <Switch>
                  <Route path="/subjects/:subject/:courseId">
                    <CoursePage />
                  </Route>

                  <Route path="/subjects/:subject">
                    <CoursesListLayout />
                  </Route>

                  <Route path="/subjects">
                    <SubjectsLayout />
                  </Route>

                  <Route exact path="/">
                    <Redirect to="/subjects" />
                  </Route>
                </Switch>
                <Footer />
              </BrowserRouter>
            </Container>
          </NotificationsProvider>
        )}
      </InitializationProvider>
    </div>
  );
}

App.propTypes = {
  getTerms: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getTerms
};

export default connect(null, mapDispatchToProps)(App);
