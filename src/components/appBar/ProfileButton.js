import React from "react";
import { connect } from "react-redux";
import {
  userIsLoadingSelector,
  userInfoSelector
} from "../../core/user/selectors";
import { Button, Typography, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useOAuth } from "../../providers/OAuthProvider";
import { useFeatureFlags } from "../../providers/FeatureFlagProvider";
import PropTypes from "prop-types";

const ProfileButton = ({ loading, userInfo }) => {
  const { facebookLogin } = useOAuth();
  const accountEnabled = useFeatureFlags().account;

  if (!accountEnabled) return null;

  const onLoginClicked = () => facebookLogin();

  if (loading) return <Typography variant="body1">...</Typography>;

  if (userInfo)
    return (
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    );

  return (
    <Button color="inherit" onClick={onLoginClicked}>
      Login
    </Button>
  );
};

ProfileButton.propTypes = {
  loading: PropTypes.bool,
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  loading: userIsLoadingSelector(state),
  userInfo: userInfoSelector(state)
});

export default connect(mapStateToProps)(ProfileButton);
