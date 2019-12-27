import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FACEBOOK_APP_ID } from "../config/config";
import { connect } from "react-redux";
import { oauthSignIn } from "../core/user/actions";
import PropTypes from "prop-types";

const oauth = {
  facebookLogin: () => {}
};

const OAuthContext = React.createContext(oauth);

const OAuthProvider = ({ children, oauthSignIn }) => {
  const onFacebookResponse = res => {
    const { accessToken } = res;
    oauthSignIn("facebook", { accessToken });
  };

  return (
    <OAuthContext.Provider value={oauth}>
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
    </OAuthContext.Provider>
  );
};

OAuthProvider.propTypes = {
  children: PropTypes.any,
  oauthSignIn: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  oauthSignIn
};

export const useOAuth = () => useContext(OAuthContext);

export default connect(null, mapDispatchToProps)(OAuthProvider);
