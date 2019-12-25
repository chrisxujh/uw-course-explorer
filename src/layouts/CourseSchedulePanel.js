import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "@material-ui/core";
import Spinner from "../components/spinner/Spinner";
import {
  termIsLoadingSelector,
  currentTermSelector,
  nextTermSelector
} from "../core/term/selectors";
import PropTypes from "prop-types";
import CourseSchedule from "../components/course/CourseSchedule";
import MessageBanner from "../components/common/MessageBanner";

const CourseSchedulePanel = ({
  course,
  termLoading,
  currentTerm,
  nextTerm
}) => {
  const [activeTerm, setActiveTerm] = useState(null);
  useEffect(() => {
    if (!termLoading && currentTerm !== null) setActiveTerm(currentTerm.id);
  }, [termLoading, currentTerm]);
  const handleSelectTerm = (e, term) => setActiveTerm(term);

  if (termLoading) return <Spinner />;
  if (activeTerm === null)
    return <MessageBanner message="Course schedule not available." />;

  return (
    <React.Fragment>
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
            label={"Next Term" + (nextTerm.name ? ` (${nextTerm.name})` : "")}
            value={nextTerm.id}
          />
        )}
      </Tabs>
      {activeTerm !== null && (
        <CourseSchedule
          subject={course.subject}
          catalogNumber={course.catalog_number}
          term={activeTerm}
        />
      )}
    </React.Fragment>
  );
};

CourseSchedulePanel.propTypes = {
  course: PropTypes.object.isRequired,

  termLoading: PropTypes.bool,
  currentTerm: PropTypes.object,
  nextTerm: PropTypes.object
};

const mapStateToProps = state => ({
  termLoading: termIsLoadingSelector(state),
  currentTerm: currentTermSelector(state),
  nextTerm: nextTermSelector(state)
});

export default connect(mapStateToProps)(CourseSchedulePanel);
