import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: '#004C8C',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(129, 129, 129, .3)',
    color: '#fff',
    fontFamily: "'Roboto', sans-serif",
    textTransform: 'capitalize',
    fontWeight: 400,
    height: 24,
    padding: '0 15px',
    '&:hover': {
      backgroundColor: '#004C8C',
      color: '#ffea00',
    },
    '&.Mui-disabled': {
      backgroundColor: '#E1E2E1',
    }
  },
});

export default function MyButton(props) {
  const classes = useStyles();
  return <Button onClick={props.click} disabled={props.disabled} className={classes.root}>{props.children}</Button>;
}