import React, { useEffect } from "react";
import AppBar from "./components/appBar/AppBar";
import CoursePage from "./components/course/CoursePage";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { makeStyles, Container } from "@material-ui/core";
import SubjectsLayout from "./layouts/SubjectsLayout";
import CoursesListLayout from "./layouts/CoursesListLayout";
import { connect } from "react-redux";
import { getTerms } from "./core/term/actions";
import Footer from "./components/footer/Footer";
import { resumeUserSession } from "./core/user/actions";
import { useFeatureFlags } from "./providers/FeatureFlagProvider";
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
  const accountEnabled = useFeatureFlags().account;

  useEffect(() => {
    if (accountEnabled) resumeUserSession();
  }, [accountEnabled, resumeUserSession]);

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
