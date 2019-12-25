import React from "react";
import CoursesList from "../components/courses/CoursesList";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

export default function() {
  const { subject } = useParams();
  return (
    <React.Fragment>
      <Typography variant="h5">Courses of {subject}:</Typography>
      <CoursesList />
    </React.Fragment>
  );
}
