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
import { useParams, Link as RouterLink } from "react-router-dom";
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
  Collapse,
  IconButton
} from "@material-ui/core";
import CourseSchedulePanel from "../CourseSchedulePanel";
import MessageBanner from "../../components/common/MessageBanner";
import { userIsLoggedInSelector } from "../../core/user/selectors";
import _ from "lodash";
import NavigationBreadcrumb from "../../components/navigation/NavigationBreadcrumb";
import { useFeatureFlags } from "../../providers/FeatureFlagProvider";
import { getCourseLink } from "../../utils/navigationUtils";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const processCourseMatch = (str, matches, { classes }) => {
  if (!str) return str;

  const result = [];
  let startIndex = 0;

  matches.forEach(({ index, match, subject, catalog_number }) => {
    result.push(str.slice(startIndex, index));
    result.push(
      <RouterLink
        key={index}
        className={classes.courseLink}
        to={getCourseLink({ subject, catalog_number })}
      >
        {match}
      </RouterLink>
    );
    startIndex = index + match.length;
  });

  result.push(str.slice(startIndex));

  return result;
};

const displayedFileds = [
  { key: "units", display: "Units" },
  {
    key: "academic_level",
    display: "Academic level"
  },
  {
    key: "prerequisites",
    display: "Prerequisites",
    accessor: (str, course, { isCourseMatchEnabled, classes }) => {
      if (!isCourseMatchEnabled) return str;

      const { preReqCourseMatches = [] } = course;
      return processCourseMatch(str, preReqCourseMatches, { classes });
    }
  },
  {
    key: "antirequisites",
    display: "Antirequisites",
    accessor: (str, course, { isCourseMatchEnabled, classes }) => {
      if (!isCourseMatchEnabled) return str;

      const { antiReqCourseMatches = [] } = course;
      return processCourseMatch(str, antiReqCourseMatches, { classes });
    }
  },
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
  },
  courseTitle: {
    marginBottom: 0
  },
  courseTitleContainer: {
    paddingBottom: theme.spacing(2)
  },
  courseLink: {
    color: theme.palette.text.primary
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
  const isCourseMatchEnabled = useFeatureFlags().courseMatch;
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
    .map(({ key, display, accessor }) => {
      const content =
        accessor instanceof Function
          ? accessor(course[key], course, { isCourseMatchEnabled, classes })
          : course[key];

      if (content) {
        return {
          caption: display,
          content
        };
      }

      return content;
    })
    .filter(Boolean)
    .map(({ caption, content }, index) => (
      <TableRow key={index}>
        <TableCell>
          <Typography variant="body2">{caption}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{content}</Typography>
        </TableCell>
      </TableRow>
    ));

  return (
    <React.Fragment>
      <Paper variant="outlined" square className={classes.courseInfoSection}>
        <Container maxWidth="lg">
          <NavigationBreadcrumb />
          <div className={classes.basicCourseInfo}>
            <Grid container className={classes.courseTitleContainer}>
              <Grid item md={10}>
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.courseTitle}
                >
                  {course.subject} {course.catalog_number} {course.title}
                </Typography>
              </Grid>
              <Grid
                container
                item
                md={2}
                alignItems="center"
                justify="flex-end"
              >
                {loggedIn && (
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={shortlisted ? handleUnshortlist : handleShortlist}
                  >
                    {shortlisted ? (
                      <StarIcon fontSize="large" />
                    ) : (
                      <StarBorderIcon fontSize="large" />
                    )}
                  </IconButton>
                )}
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
