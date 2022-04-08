import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MyIcons from "./MyIcons";

const useStyles = makeStyles({
  root: {
    background: "#004C8C",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(129, 129, 129, .3)',
    color: "#fff",
    fontFamily: "'Roboto', sans-serif",
    textTransform: "capitalize",
    fontWeight: 400,
    height: 24,
    padding: "0 15px",
    margin: "5px 0",
    minWidth: "54px",
  },
  menu: {
    "& .MuiMenu-paper": {
      background: "#56ACE0", //$light-blue
      left: "100px !important",
    },
    "& ul": {
      // background:
      //   "linear-gradient(-135deg, rgba(255, 255, 255, .5) 60%,  rgba(255, 255, 255, .0))",
      background: '#E1E2E1',
    },
    "& li": {
      background: "none",
    },
  },
  menuItem:  {
    textDecoration: 'none',
    
    "& .menuItem-title": {
      paddingLeft: '21px',
      lineHeight: '24px',
      fontFamily: "'Roboto', sans-serif",
      fontSize: '14px',
      fontWeight: '500',
      letterSpacing: '.5px',
      color: '#000000cc',
      whiteSpace: 'nowrap',
    }
  }
});

export default function MyMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {props.title ? (
        <Button
          className={classes.root}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {props.title}
        </Button>
      ) : (
        <MyIcons click={handleClick}>{React.createElement(props.icon)}</MyIcons>
      )}

      <Menu
        id="simple-menu"
        className={classes.menu}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.items.map((el, index) => (
          <Link key={index} to={el.url} onClick={handleClose} className={classes.menuItem}>
            <MenuItem>
              <MyIcons>{React.createElement(el.icon)}</MyIcons>
              <span className="menuItem-title">{el.title}</span>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
}
