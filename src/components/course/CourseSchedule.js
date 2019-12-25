import React, { useEffect, useState } from "react";
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
  TableBody,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import Spinner from "../spinner/Spinner";
import MessageBanner from "../common/MessageBanner";

const CourseSchedule = ({
  subject,
  term,
  catalogNumber,
  loading,
  sections,
  getCourseSchedule
}) => {
  useEffect(() => {
    if (term) getCourseSchedule(term, subject, catalogNumber);
  }, [catalogNumber, getCourseSchedule, subject, term]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (loading) return <Spinner />;

  const handlePageChange = (e, newPage) => setPage(newPage);

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const sectionsList = [];
  sections.forEach(({ section, classes }) => {
    classes.forEach(({ date, location, instructors }) => {
      sectionsList.push({ section, date, location, instructors });
    });
  });

  const sectionsToRender = sectionsList
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    .map(
      (
        {
          section,
          date: { start_time, end_time, weekdays },
          location: { building, room },
          instructors
        },
        key
      ) => (
        <TableRow key={key}>
          <TableCell>{section}</TableCell>
          <TableCell>
            {start_time} - {end_time} ({weekdays})
          </TableCell>
          <TableCell>
            {building} {room}
          </TableCell>
          <TableCell>{instructors.join(", ")}</TableCell>
        </TableRow>
      )
    );

  if (sectionsList.length === 0)
    return <MessageBanner message="No schedule found." />;

  return (
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
        <TableBody>{sectionsToRender}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={rowsPerPage}
              count={sectionsList.length}
              page={page}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
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
