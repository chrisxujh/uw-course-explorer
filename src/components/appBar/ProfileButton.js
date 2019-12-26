import React from "react";
import { connect } from "react-redux";
import {
  userIsLoadingSelector,
  userIsSignedInSelector
} from "../../core/user/selectors";
import { Button, Typography, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useOAuth } from "../../providers/OAuthProvider";
import { useFeatureFlags } from "../../providers/FeatureFlagProvider";
import PropTypes from "prop-types";

const ProfileButton = ({ loading, signedIn }) => {
  const { facebookLogin } = useOAuth();
  const accountEnabled = useFeatureFlags().account;

  if (!accountEnabled) return null;

  const onLoginClicked = () => facebookLogin();

  if (loading) return <Typography variant="body1">Signing in</Typography>;

  if (signedIn)
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
  signedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: userIsLoadingSelector(state),
  signedIn: userIsSignedInSelector(state)
});

export default connect(mapStateToProps)(ProfileButton);
