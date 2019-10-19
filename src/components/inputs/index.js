import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  'url-grid': {
    marginTop: '20vh',
  },
  'url-paper': {
    padding:         theme.spacing(3, 3),
    backgroundColor: 'white',
    color:           '#f5f5f5',
  },
  'url-container': {
    width: '80%',
  },
}));

const Inputs = ({
  learningLink, setLearningLink, knownLink, setKnownLink
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing    = { 5 }
      direction  = "column"
      justify    = "center"
      alignItems = "center"
      className  = { classes['url-grid'] }
    >
      <Grid item className = { classes['url-container'] }>
        <Paper className = { classes['url-paper'] }>
          <TextField
            fullWidth
            value      = { learningLink }
            onChange   = { e => setLearningLink( e.target.value ) }
            helperText = "Link to Webtoon in the language you want to learn"
          />
        </Paper>
      </Grid>
      <Grid item className = { classes['url-container'] }>
        <Paper className = { classes['url-paper'] }>
          <TextField
            fullWidth
            value      = { knownLink }
            onChange   = { e => setKnownLink( e.target.value ) }
            helperText = "Link to Webtoon in the language you already know"
          />
        </Paper>
      </Grid>
    </Grid>
  )
};

Inputs.propTypes = {
  learningLink:    PropTypes.string.isRequired,
  setLearningLink: PropTypes.func.isRequired,
  knownLink:       PropTypes.string.isRequired,
  setKnownLink:    PropTypes.func.isRequired,
}

export default Inputs;
