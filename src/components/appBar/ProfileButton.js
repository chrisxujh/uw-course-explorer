import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  userIsLoadingSelector,
  userIsLoggedInSelector
} from '../../core/user/selectors';
import {
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logOut, oauthSignIn } from '../../core/user/actions';
import PropTypes from 'prop-types';
import LoginDialog from '../login/LoginDialog';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  link: {
    color: 'black',
    textDecoration: 'none'
  }
});

const ProfileButton = ({ loading, loggedIn, logOut, oauthSignIn }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const classNames = useStyles();

  if (loading) return <Typography variant="body1">...</Typography>;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut();
    handleClose();
  };

  if (loggedIn) {
    return (
      <React.Fragment>
        <IconButton onClick={handleClick} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link
            className={classNames.link}
            to="/profile"
            onClick={() => setAnchorEl(null)}
          >
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  const handleLogin = () => {
    setShowLoginDialog(true);
  };

  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleLogin}>
        Login
      </Button>
      <LoginDialog
        open={showLoginDialog}
        onClose={handleCloseDialog}
        oauthSignIn={oauthSignIn}
      />
    </React.Fragment>
  );
};

ProfileButton.propTypes = {
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  logOut: PropTypes.func.isRequired,
  oauthSignIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: userIsLoadingSelector(state),
  loggedIn: userIsLoggedInSelector(state)
});

const mapDispatchToProps = {
  logOut,
  oauthSignIn
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton);
