import React from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { GA_TRACKING_ID, ENV } from '../config/config';

ReactGA.initialize(GA_TRACKING_ID);
if (ENV === 'dev') ReactGA.set({ sendHitTask: null });

export default function ({ children }) {
  const history = useHistory();

  ReactGA.pageview(history.location.pathname);

  return <React.Fragment>{children}</React.Fragment>;
}
