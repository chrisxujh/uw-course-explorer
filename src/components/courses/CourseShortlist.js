import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  GridList,
  makeStyles,
  CardActionArea
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getCourseLink } from "../../utils/navigationUtils";

const useStyles = makeStyles(theme => ({
  courseCard: {
    height: "100%"
  },
  courseLink: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textDecoration: "none",
    color: "inherit",
    height: "100%"
  }
}));

const CourseShortlist = ({ courses }) => {
  const classes = useStyles();
  const coursesList = courses.map((course, key) => (
    <Link className={classes.courseLink} key={key} to={getCourseLink(course)}>
      <Card variant="outlined" className={classes.courseCard}>
        <CardActionArea style={{ height: "100%" }}>
          <CardContent style={{ height: "100%" }}>
            <Typography variant="body1">
              <b>
                {course.subject} {course.catalog_number}
              </b>
            </Typography>
            <Typography variant="body2">{course.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  ));
  return (
    <GridList cols={5} cellHeight={100} style={{ overflowY: "unset" }}>
      {coursesList}
    </GridList>
  );
};

CourseShortlist.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseShortlist;
