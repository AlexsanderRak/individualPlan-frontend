import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    background: '#004C8C',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(129, 129, 129, .3)',
    color: '#fff',
    height: 24,
    padding: '0 15px',
    '&:hover': {
      background: '#004C8C',
    },
    '&:hover .MuiIconButton-label': {
      color: '#ffea00',
    },
    '&.Mui-disabled': {
      backgroundColor: '#E1E2E1',
    }
  },
});

export default function MyIcons(props) {
  const classes = useStyles();
  return <IconButton onClick={props.click} disabled={props.disabled} className={classes.root}>{props.children}</IconButton>;
}