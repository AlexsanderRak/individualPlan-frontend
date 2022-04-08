import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  root: {
    color: "#004C8C",
    height: 24,
    padding: "0 15px",
    '& .MuiBadge-badge': {
      background: "#E1E2E1",
      boxShadow: '0 3px 5px 2px rgba(129, 129, 129, .3)',
    },
  },
  
});

export default function MyBadge(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={props.messages} showZero>
        <MailIcon />
      </Badge>
    </div>
  );
}
