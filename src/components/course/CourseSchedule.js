import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  courseScheduleIsLoadingSelector,
  courseSectionsSelector
} from "./selectors";
import PropTypes from "prop-types";
import { getCourseSchedule } from "./actions";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import Spinner from "../spinner/Spinner";

const CourseSchedule = ({
  subject,
  term,
  catalogNumber,
  loading,
  sections,
  getCourseSchedule
}) => {
  useEffect(() => {
    getCourseSchedule(term, subject, catalogNumber);
  }, [getCourseSchedule]);

  const sectionsList = sections
    .map(({ section, classes }) => ({
      section,
      startTime: classes[0].date.start_time,
      endTime: classes[0].date.end_time,
      weekdays: classes[0].date.weekdays,
      location: classes[0].location,
      instructors: classes[0].instructors
    }))
    .map(
      (
        {
          section,
          startTime,
          endTime,
          weekdays,
          instructors,
          location: { building, room }
        },
        key
      ) => (
        <TableRow key={key}>
          <TableCell>{section}</TableCell>
          <TableCell>
            {startTime} - {endTime} ({weekdays})
          </TableCell>
          <TableCell>
            {building} {room}
          </TableCell>
          <TableCell>{instructors.join(", ")}</TableCell>
        </TableRow>
      )
    );

  return (
    <React.Fragment>
      {loading && <Spinner />}
      {!loading && sectionsList.length === 0 && "Empty"}
      {!loading && sectionsList.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Section</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Instructors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{sectionsList}</TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

CourseSchedule.propTypes = {
  subject: PropTypes.string.isRequired,
  term: PropTypes.number.isRequired,
  catalogNumber: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  sections: PropTypes.array,

  getCourseSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: courseScheduleIsLoadingSelector(state),
  sections: courseSectionsSelector(state)
});

const mapDispatchToProps = {
  getCourseSchedule
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseSchedule);