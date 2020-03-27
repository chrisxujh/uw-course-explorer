import React from "react";
import { Breadcrumbs, Typography, makeStyles } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    marginBottom: theme.spacing(3)
  },
  link: {
    color: theme.palette.text.primary,
    textTransform: "capitalize"
  },
  lastText: {
    color: theme.palette.text.disabled
  }
}));

export default function NavigationBreadcrumb() {
  const classes = useStyles();
  const location = useLocation();

  const parts = location.pathname.split("/").filter(Boolean);
  console.log(parts);

  return (
    <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
      {parts.map((part, i) => {
        if (i === parts.length - 1) {
          return (
            <Typography key={part} className={classes.lastText}>
              {part}
            </Typography>
          );
        }

        return (
          <Link
            key={part}
            className={classes.link}
            to={`/${parts.slice(0, i + 1).join("/")}`}
          >
            {part}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
