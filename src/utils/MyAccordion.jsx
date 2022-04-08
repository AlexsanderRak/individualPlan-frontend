import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 4,
    // background: 'linear-gradient(135deg, rgba(255, 255, 255, .5) 30%, rgba(255, 255, 255, 0))',
    background: '#58A5F0',
    '& svg': {
      color: '#F5F5F6'
    },
    '&.MuiPaper-elevation1': {
      boxShadow: '0 2px 5px 2px rgba(129, 129, 129, .3)'
    }
  },
  title: {
    color: '#F5F5F6',
    fontFamily: "'Roboto', sans-serif",
    fontSize: 16,
    fontWeight: 600,
  }
}));

export default function MyAccordion(props) {
  const classes = useStyles();

  return (
    <Accordion className={classes.root}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >
      <span className={classes.title}>{props.title}</span>
    </AccordionSummary>
    <AccordionDetails>
      {props.children}
    </AccordionDetails>
  </Accordion>
 
    // <FormControl className={classes.root} disabled={props.isDisabled} error={props.isError}>
    //     <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={props.value}
    //       onChange={props.change}
    //     >
    //       {props.valueList.map((el, index) =>
    //       <MenuItem key={index} value={el.id}>{el.title}</MenuItem>
    //       )}
    //     </Select>
    //     { props.isError && 
    //       <FormHelperText>{props.errorText}</FormHelperText>
    //     }
       
    //   </FormControl>
  );
}
