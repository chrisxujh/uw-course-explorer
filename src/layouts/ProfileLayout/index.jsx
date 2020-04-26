import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Divider,
  makeStyles,
  ListItem,
  ListItemText,
  Avatar
} from '@material-ui/core';
import {
  userInfoSelector,
  coursesTakenSelector
} from '../../core/user/selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PaginatedList from '../../components/common/PaginatedList';
import { Link } from 'react-router-dom';
import { getCourseCode } from '../../utils/utils';
import { getCourseLink } from '../../utils/navigationUtils';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(4)
  },
  username: {
    marginBottom: theme.spacing(1)
  }
}));

const ProfileLayout = props => {
  const classNames = useStyles();
  const { userInfo, coursesTaken } = props;

  const renderTakenCourse = course => (
    <Link
      key={getCourseCode(course.subject, course.catalogNumber)}
      className={classNames.link}
      to={getCourseLink({
        subject: course.subject,
        catalog_number: course.catalogNumber
      })}
    >
      <ListItem button>
        <ListItemText>
          {course.subject} {course.catalogNumber} {course.title}
        </ListItemText>
      </ListItem>
    </Link>
  );

  return (
    <Container maxWidth="lg">
      <Box paddingTop={6}>
        <Paper variant="outlined" square>
          <Box padding={4}>
            <Avatar
              alt={userInfo.displayName}
              src={userInfo.avatarUrl}
              className={classNames.avatar}
            />
            <Typography className={classNames.username} variant="h4">
              {userInfo.displayName}
            </Typography>
            {coursesTaken.length > 0 && (
              <React.Fragment>
                <Divider />
                <Box marginTop={4}>
                  <Typography variant="h6">Course taken</Typography>
                  <PaginatedList
                    items={coursesTaken}
                    renderItem={renderTakenCourse}
                  />
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

ProfileLayout.propTypes = {
  userInfo: PropTypes.object,
  coursesTaken: PropTypes.array
};

const mapStateToProps = state => ({
  userInfo: userInfoSelector(state),
  coursesTaken: coursesTakenSelector(state)
});

export default connect(mapStateToProps)(ProfileLayout);
