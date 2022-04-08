import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
        color: '#F5F5F6'
    },
    "& input": {
        color: '#F5F5F6'
    },
    "& textarea": {
        color: '#F5F5F6'
    },
    "& label.Mui-focused": {
        color: "#F5F5F6",
    },
    "& .MuiInput-underline:before": {
        borderBottomColor: "#F5F5F6",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#F5F5F6",
    },
    
  },
}));

export default function MyTextField(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      disabled={props.disabled}
      error={props.isError}
      onChange={props.change}
      value={props.value}
      helperText={props.isError && props.errorText}
      label={props.label}
      placeholder={props.placeholder}
      type={props.type ? props.type : 'text'}
      multiline={props.multiline}
      maxRows={props.maxRows || 1}
      rows={props.rows || 1}
    />
  );
}
