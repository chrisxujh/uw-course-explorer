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
import { useOAuth } from "../../providers/OAuthProvider";
import { useFeatureFlags } from "../../providers/FeatureFlagProvider";
import { logOut } from "../../core/user/actions";
import PropTypes from "prop-types";

const ProfileButton = ({ loading, loggedIn, logOut }) => {
  const { facebookLogin } = useOAuth();
  const accountEnabled = useFeatureFlags().account;
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!accountEnabled) return null;

  const onLoginClicked = () => facebookLogin();

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

  if (loggedIn)
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

  return (
    <Button color="inherit" onClick={onLoginClicked}>
      Login
    </Button>
  );
};

ProfileButton.propTypes = {
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: userIsLoadingSelector(state),
  loggedIn: userIsLoggedInSelector(state)
});

const mapDispatchToProps = {
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton);
