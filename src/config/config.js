export const ENV = "dev";

export const SERVER_URL = "http://localhost:8000";

export const CONFIG_SERVER_URL =
  "https://raw.githubusercontent.com/ChrisXJH/config-server/master/uw_course_explorer";

export const FEATURE_FLAG_SERVER_URL =
  "https://raw.githubusercontent.com/ChrisXJH/config-server/master/uw_course_explorer/feature_flags/dev.json";

export const FACEBOOK_APP_ID = 507086496600584;

export const configList = [
  {
    key: "popularSubjects",
    url: `${CONFIG_SERVER_URL}/subjects/popular_subjects.json`
  }
];
