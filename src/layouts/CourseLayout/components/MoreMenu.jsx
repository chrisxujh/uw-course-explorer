import React from 'react';
import { Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { coursesTakenMapSelector } from '../../../core/user/selectors';
import {
  markCourseTaken,
  unMarkCourseTaken
} from '../../../components/course/actions';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { getCourseCode } from '../../../utils/utils';

const MoreMenu = ({
  anchorEl,
  course,
  markCourseTakenMap,
  onClose,
  markCourseTaken,
  unMarkCourseTaken
}) => {
  const isCourseTaken =
    markCourseTakenMap[getCourseCode(course.subject, course.catalog_number)];

  const handleCourseTaken = () => {
    const payload = {
      subject: course.subject,
      catalogNumber: course.catalog_number
    };

    isCourseTaken ? unMarkCourseTaken(payload) : markCourseTaken(payload);
    onClose();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={handleCourseTaken}>
        <ListItemIcon>
          {isCourseTaken ? <ClearIcon /> : <CheckIcon />}
        </ListItemIcon>
        <Typography>
          {isCourseTaken
            ? "I didn't take this course"
            : 'I have taken this course'}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

MoreMenu.propTypes = {
  anchorEl: PropTypes.object,
  course: PropTypes.object.isRequired,
  markCourseTakenMap: PropTypes.object,

  onClose: PropTypes.func.isRequired,
  markCourseTaken: PropTypes.func.isRequired,
  unMarkCourseTaken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  markCourseTakenMap: coursesTakenMapSelector(state)
});

const mapDispatchToProps = {
  markCourseTaken,
  unMarkCourseTaken
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreMenu);
