import React, { useContext, useEffect } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FACEBOOK_APP_ID } from "../config/config";
import { connect } from "react-redux";
import { oauthSignIn } from "../core/user/actions";
import { useFeatureFlags } from "./FeatureFlagProvider";
import PropTypes from "prop-types";

const oauth = {
  facebookLogin: () => {}
};

const oauthContext = React.createContext(oauth);

const OAuthProvider = ({ children, oauthSignIn }) => {
  const accountEnabled = useFeatureFlags().account;

  useEffect(() => {
    const oauthToken = localStorage.getItem("oauth-token");
    if (oauthToken !== null && accountEnabled) {
      oauthSignIn(localStorage.getItem("oauth-provider"), {
        accessToken: oauthToken
      });
    }
  }, [accountEnabled, oauthSignIn]);

  const onFacebookResponse = res => {
    const { accessToken } = res;
    oauthSignIn("facebook", { accessToken });
  };

  return (
    <React.Fragment>
      {children}
      <FacebookLogin
        render={({ onClick }) => {
          oauth.facebookLogin = onClick;
          return null;
        }}
        appId={FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={onFacebookResponse}
      />
    </React.Fragment>
  );
};

OAuthProvider.propTypes = {
  children: PropTypes.any,
  oauthSignIn: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  oauthSignIn
};

export const useOAuth = () => useContext(oauthContext);

export default connect(null, mapDispatchToProps)(OAuthProvider);
