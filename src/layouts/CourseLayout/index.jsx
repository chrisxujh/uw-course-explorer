import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  courseIsLoadingSelector,
  courseSelector
} from "../../components/course/selectors";
import {
  shortlistCourse,
  unshortlistCourse,
  getCourseByCatalogNumber
} from "../../components/course/actions";
import Spinner from "../../components/spinner/Spinner";
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
  Button,
  Paper,
  Container,
  makeStyles,
  Collapse
} from "@material-ui/core";
import CourseSchedulePanel from "../CourseSchedulePanel";
import MessageBanner from "../../components/common/MessageBanner";
import { userIsLoggedInSelector } from "../../core/user/selectors";
import _ from "lodash";
import NavigationBreadcrumb from "../../components/navigation/NavigationBreadcrumb";

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

const useStyles = makeStyles(theme => ({
  courseInfoSection: {
    paddingBottom: theme.spacing(2)
  },
  basicCourseInfo: {
    marginBottom: theme.spacing(2)
  },
  courseDetails: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  sectionsContainer: {
    marginTop: theme.spacing(4)
  },
  schedules: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(6)
  }
}));

const CourseLayout = ({
  loading,
  course,
  loggedIn,
  getCourseByCatalogNumber,
  shortlistCourse,
  unshortlistCourse
}) => {
  const { subject, catalogNumber } = useParams();
  const classes = useStyles();

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getCourseByCatalogNumber({ subject, catalogNumber });
  }, [catalogNumber, getCourseByCatalogNumber, subject]);

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

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
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
      <Paper variant="outlined" square className={classes.courseInfoSection}>
        <Container maxWidth="lg">
          <NavigationBreadcrumb />
          <div className={classes.basicCourseInfo}>
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
          <Collapse in={showDetails}>
            <TableContainer className={classes.courseDetails}>
              <Table>
                <TableBody>{fields}</TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Container>
        <Container>
          <Button color="primary" onClick={handleShowDetails}>
            Show {showDetails ? "less" : "more"}
          </Button>
        </Container>
      </Paper>
      <Container className={classes.sectionsContainer}>
        <Paper variant="outlined" square className={classes.schedules}>
          <Typography variant="h6">Sections</Typography>
          {course !== null && <CourseSchedulePanel course={course} />}
        </Paper>
      </Container>
    </React.Fragment>
  );
};

CourseLayout.propTypes = {
  loading: PropTypes.bool,
  course: PropTypes.object,
  loggedIn: PropTypes.bool,

  getCourseByCatalogNumber: PropTypes.func.isRequired,
  shortlistCourse: PropTypes.func.isRequired,
  unshortlistCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: courseIsLoadingSelector(state),
  course: courseSelector(state),
  loggedIn: userIsLoggedInSelector(state)
});

const mapDispatchToProps = {
  getCourseByCatalogNumber,
  shortlistCourse,
  unshortlistCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseLayout);
