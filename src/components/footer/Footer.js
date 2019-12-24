import React, { useState, useEffect } from "react";
import { Typography, SvgIcon, Link, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Footer.css";

const SECOND_MILL_SECONDS = 1000;
const MINUTE_MILL_SECONDS = 60 * SECOND_MILL_SECONDS;
const HOUR_MILL_SECONDS = 60 * MINUTE_MILL_SECONDS;
const DAY_MILL_SECONDS = 24 * HOUR_MILL_SECONDS;

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4)
  },
  links: {
    marginTop: theme.spacing(1)
  },
  githubLnk: {
    color: "#333"
  }
}));

export default function() {
  const classes = useStyles();
  const [age, setAge] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0
  });

  const birthday = new Date(1544164920000);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date() - birthday;
      const seconds = Math.floor(diff / SECOND_MILL_SECONDS) % 60;
      const minutes = Math.floor(diff / MINUTE_MILL_SECONDS) % 60;
      const hours = Math.floor(diff / HOUR_MILL_SECONDS) % 24;
      const days = Math.floor(diff / DAY_MILL_SECONDS);

      setAge({ seconds, minutes, hours, days });
    }, 1000);
    return () => clearInterval(interval);
  }, [birthday]);

  return (
    <div className={classes.root}>
      <Typography variant="caption" component="p" align="center">
        Contains information provided by the University of Waterloo under
        license on an 'as is' basis
      </Typography>
      <div className={classes.links}>
        <Typography variant="caption" component="p" align="center">
          {age.days} days {age.hours} hrs {age.minutes} mins {age.seconds} secs
          &nbsp;
          <SvgIcon
            component={FavoriteIcon}
            fontSize="small"
            className="heart-icon icon"
          />
          &nbsp; |&nbsp;
          <Link
            className={classes.githubLnk}
            href="https://github.com/ChrisXJH/uw-course-explorer"
            target="_blank"
            rel="noopener"
          >
            GITHUB&nbsp;
            <SvgIcon
              className="icon"
              component={GitHubIcon}
              fontSize="small"
            ></SvgIcon>
          </Link>
        </Typography>
      </div>
    </div>
  );
}
