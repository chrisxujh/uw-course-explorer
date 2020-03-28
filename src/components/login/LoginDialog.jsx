import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_APP_ID } from "../../config/config";

const LoginDialog = ({ open, onClose, oauthSignIn }) => {
  const onFacebookResponse = res => {
    const { accessToken } = res;
    oauthSignIn("facebook", { accessToken });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <FacebookLogin
          appId={FACEBOOK_APP_ID}
          fields="name,email,picture"
          callback={onFacebookResponse}
        />
      </DialogContent>
    </Dialog>
  );
};

LoginDialog.defaultProps = {
  open: false
};

LoginDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  oauthSignIn: PropTypes.func.isRequired
};

export default LoginDialog;
