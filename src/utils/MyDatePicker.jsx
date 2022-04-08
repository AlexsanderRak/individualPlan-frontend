import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: 15,
      '&:hover': {
          "& .MuiInput-underline:before": {
              borderBottomColor: "#ffea00",
          }
      },
      '& label': {
          color: '#fff'
      },
      "& input": {
          color: '#fff'
      },
      "& textarea": {
          color: '#fff'
      },
      "& .MuiIconButton-label": {
        color: '#fff'
      },
      "& label.Mui-focused": {
          color: "#fff",
      },
      "& .MuiInput-underline:before": {
          borderBottomColor: "#fff",
      },
      "& .MuiInput-underline:after": {
          borderBottomColor: "#fff",
      },
      
    },
  }));

export default function MyDatePicker(props) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        style={props.style}
        disableToolbar
        variant="inline"
        format={props.format || "DD.MM.yyyy"}
        mask={props.mask || "__.__.____"}
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={props.value}
        onChange={props.change}
        disabled={props.disabled}
        className={classes.root}
        disablePast={props.disablePast}
        disableFuture={props.disableFuture}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
