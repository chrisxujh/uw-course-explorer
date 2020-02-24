import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { courseIsLoadingSelector, courseSelector } from "./selectors";
import { getCourseById, shortlistCourse, unshortlistCourse } from "./actions";
import Spinner from "../spinner/Spinner";
import { useParams } from "react-router-dom";
import {
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Link,
  Grid,
  Button
} from "@material-ui/core";
import CourseSchedulePanel from "../../layouts/CourseSchedulePanel";
import MessageBanner from "../common/MessageBanner";
import { userIsLoggedInSelector } from "../../core/user/selectors";
import _ from "lodash";

const displayedFileds = [
  { key: "units", display: "Units" },
  {
    key: "academic_level",
    display: "Academic level"
  },
  { key: "prerequisites", display: "Prerequisites" },
  { key: "antirequisites", display: "Antirequisites" },
  {
    key: "terms_offered",
    display: "Terms offered",
    accessor: terms => terms.join(", ")
  },
  {
    key: "notes",
    display: "Notes"
  },
  {
    key: "url",
    display: "Url",
    accessor: url => (
      <Link href={url} target="_blank" rel="noopener">
        {url}
      </Link>
    )
  }
];

const CoursePage = ({
  loading,
  course,
  loggedIn,
  getCourseById,
  shortlistCourse,
  unshortlistCourse
}) => {
  const { courseId } = useParams();
  useEffect(() => {
    getCourseById(courseId);
  }, [courseId, getCourseById]);

  if (loading) return <Spinner />;
  if (course === null || _.isEmpty(course))
    return <MessageBanner message="Course not available." />;

  const { shortlisted } = course;
  const handleShortlist = () => {
    shortlistCourse(course);
  };

  const handleUnshortlist = () => {
    unshortlistCourse(course);
  };

  const fields = displayedFileds
    .filter(({ key, accessor }) =>
      accessor instanceof Function ? accessor(course[key]) : course[key]
    )
    .map(({ key, display, accessor }, index) => (
      <TableRow key={index}>
        <TableCell>
          <Typography variant="body2">{display}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {accessor instanceof Function ? accessor(course[key]) : course[key]}
          </Typography>
        </TableCell>
      </TableRow>
    ));

  return (
    <React.Fragment>
      {!loading && course && (
        <React.Fragment>
          <div>
            <Grid container>
              <Grid item md={10}>
                <Typography variant="h4" gutterBottom>
                  {course.subject} {course.catalog_number} {course.title}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Grid container>
                  {loggedIn && (
                    <Button
                      variant="outlined"
                      color={shortlisted ? "secondary" : "primary"}
                      onClick={
                        shortlisted ? handleUnshortlist : handleShortlist
                      }
                    >
                      {shortlisted ? "Unshortlist" : "Shortlist"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="subtitle1">{course.description}</Typography>
          </div>
          <br />
          <TableContainer>
            <Table>
              <TableBody>{fields}</TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <Typography variant="h6">Sections</Typography>
          {course !== null && <CourseSchedulePanel course={course} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

CoursePage.propTypes = {
  loading: PropTypes.bool,
  course: PropTypes.object,
  loggedIn: PropTypes.bool,

  getCourseById: PropTypes.func.isRequired,
  shortlistCourse: PropTypes.func.isRequired,
  unshortlistCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: courseIsLoadingSelector(state),
  course: courseSelector(state),
  loggedIn: userIsLoggedInSelector(state)
});

const mapDispatchToProps = {
  getCourseById,
  shortlistCourse,
  unshortlistCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
