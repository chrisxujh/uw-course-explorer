import React from "react";
import SubjectsList from "../components/subjects/SubjectsList";
import { Typography } from "@material-ui/core";

export default function() {
  return (
    <React.Fragment>
      <Typography variant="h6">Subjects:</Typography>
      <SubjectsList />
    </React.Fragment>
  );
}
