export const ENV = "dev";

export const SERVER_URL = "http://localhost:8000";

export const CONFIG_SERVER_URL =
  "https://raw.githubusercontent.com/ChrisXJH/config-server/master/uw_course_explorer";

export const configList = [
  {
    key: "popularSubjects",
    url: `${CONFIG_SERVER_URL}/subjects/popular_subjects.json`
  }
];
