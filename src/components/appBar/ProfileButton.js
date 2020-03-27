import React from "react";
import { connect } from "react-redux";
import {
  userIsLoadingSelector,
  userIsLoggedInSelector
} from "../../core/user/selectors";
import {
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logOut, oauthSignIn } from "../../core/user/actions";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FACEBOOK_APP_ID } from "../../config/config";
import PropTypes from "prop-types";

const ProfileButton = ({ loading, loggedIn, logOut, oauthSignIn }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  const onFacebookResponse = res => {
    const { accessToken } = res;
    oauthSignIn("facebook", { accessToken });
  };

  return (
    <FacebookLogin
      render={({ onClick }) => {
        return (
          <Button color="inherit" onClick={onClick}>
            Login
          </Button>
        );
      }}
      appId={FACEBOOK_APP_ID}
      fields="name,email,picture"
      callback={onFacebookResponse}
    />
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
