import React from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import SubjectsList from "./components/subjects/SubjectsList";
import CoursesList from "./components/courses/CoursesList";
import CoursePage from "./components/course/CoursePage";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}));

function App() {
  const classes = useStyle();

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <div className={classes.offset} />
        <Switch>
          <Route path="/subjects/:subject/:courseId">
            <CoursePage />
          </Route>

          <Route path="/subjects/:subject">
            <CoursesList />
          </Route>

          <Route path="/subjects">
            <SubjectsList />
          </Route>

          <Route exact path="/">
            <Redirect to="/subjects" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
