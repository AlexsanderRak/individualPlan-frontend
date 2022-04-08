import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    circularLow: {
        color: '#FF5733',
    },
    circularMid: {
        color: '#ffea00',
    },
    circularHigh: {
        color: '#00FF7F',
    },
    typographyLow: {
        color: '#FF5733',
    },
    typographyMid: {
        color: '#ffea00',
    },
    typographyHigh: {
        color: '#00FF7F',
    }
});

function MyCircularProgressWithLabel(props) {
    const classes = useStyles();
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress className={props.value < 30 ? classes.circularLow : props.value < 60 ? classes.circularMid : classes.circularHigh} variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography className={props.value < 30 ? classes.typographyLow : props.value < 60 ? classes.typographyMid : classes.typographyHigh} variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

MyCircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default MyCircularProgressWithLabel;
