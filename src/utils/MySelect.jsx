import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 15,
    "&:hover": {
      "& .MuiInput-underline:before": {
        borderBottomColor: "#ffea00",
      },
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
    "& label": {
      color: "#F5F5F6",
    },
    "& div": {
      color: "#F5F5F6",
    },
    "& svg": {
      color: "#F5F5F6",
    },
    "& input": {
      color: "#666",
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

export default function MySelect(props) {
  const classes = useStyles();

  return (
    <FormControl
      className={classes.root}
      disabled={props.isDisabled}
      error={props.isError}
    >
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={props.change}
        disabled={props.disabled}
      >
        {props.valueList.map((el, index) => (
          <MenuItem key={index} value={el.id}>
            {el.title}
          </MenuItem>
        ))}
      </Select>
      {props.isError && <FormHelperText>{props.errorText}</FormHelperText>}
    </FormControl>
  );
}
