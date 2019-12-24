import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { courseIsLoadingSelector, courseSelector } from "./selectors";
import { getCourseById } from "./actions";
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
  Tabs,
  Tab
} from "@material-ui/core";
import CourseSchedule from "./CourseSchedule";
import {
  currentTermSelector,
  nextTermSelector,
  termIsLoadingSelector
} from "../../core/term/selectors";

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
  termLoading,
  course,
  getCourseById,
  currentTerm,
  nextTerm
}) => {
  const { courseId } = useParams();
  useEffect(() => {
    getCourseById(courseId);
  }, [courseId, getCourseById]);

  const fields =
    course !== null
      ? displayedFileds
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
                  {accessor instanceof Function
                    ? accessor(course[key])
                    : course[key]}
                </Typography>
              </TableCell>
            </TableRow>
          ))
      : [];

  const [activeTerm, setActiveTerm] = useState();

  useEffect(() => {
    if (!termLoading && currentTerm !== null) setActiveTerm(currentTerm.id);
  }, [termLoading, currentTerm]);

  const handleSelectTerm = (e, term) => setActiveTerm(term);

  return (
    <div>
      {loading && <Spinner />}
      {!loading && course && (
        <React.Fragment>
          <div>
            <Typography variant="h4" gutterBottom>
              {course.subject} {course.catalog_number} {course.title}
            </Typography>
            <Typography variant="subtitle1">{course.description}</Typography>
          </div>
          <br />
          <div>
            <TableContainer>
              <Table>
                <TableBody>{fields}</TableBody>
              </Table>
            </TableContainer>
          </div>
          <br />
          <br />
          <Typography variant="h6">Sections</Typography>
          {!termLoading && (
            <Tabs
              value={activeTerm}
              onChange={handleSelectTerm}
              indicatorColor="primary"
              textColor="primary"
            >
              {currentTerm !== null && (
                <Tab
                  label={
                    "Current Term" +
                    (currentTerm.name ? ` (${currentTerm.name})` : "")
                  }
                  value={currentTerm.id}
                />
              )}
              {nextTerm !== null && (
                <Tab
                  label={
                    "Next Term" + (nextTerm.name ? ` (${nextTerm.name})` : "")
                  }
                  value={nextTerm.id}
                />
              )}
            </Tabs>
          )}
          {activeTerm !== null && (
            <CourseSchedule
              subject={course.subject}
              catalogNumber={course.catalog_number}
              term={activeTerm}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

CoursePage.propTypes = {
  loading: PropTypes.bool,
  termLoading: PropTypes.bool,
  course: PropTypes.object,
  currentTerm: PropTypes.object,
  nextTerm: PropTypes.object,

  getCourseById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: courseIsLoadingSelector(state),
  termLoading: termIsLoadingSelector(state),
  course: courseSelector(state),
  currentTerm: currentTermSelector(state),
  nextTerm: nextTermSelector(state)
});

const mapDispatchToProps = {
  getCourseById
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
