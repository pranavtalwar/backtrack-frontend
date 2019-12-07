import React, { useState } from 'react';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Copyright from './Copyright';
import AppBar from './AppBar/AppBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    textAlign: 'left'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  newtext: {
    fontSize: 25,
  },
  pbitext: {
    fontSize: 18,
  },
}));

const CreateSprint = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const { projectID } = props;

  const url2 = "http://127.0.0.1:8000/sprint/";

  const handleCreateSprint = e => {
    e.preventDefault();
    if(startDate == null) {
      alert('Please enter a start date for the sprint');
      return;
    }
    else if(endDate == null) {
      alert('Please enter an end date for the sprint');
      return;
    }
    else if(capacity == null) {
      alert('Please enter a capacity for the sprint');
      return;
    }
    console.log(JSON.stringify({
      start_date: startDate.toISOString().substring(0,10),
      end_date: endDate.toISOString().substring(0,10),
      capacity: capacity,
      project: 1,
    }));
    fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        start_date: startDate.toISOString().substring(0,10),
        end_date: endDate.toISOString().substring(0,10),
        capacity: capacity,
        project: projectID,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json)
    .then(json => {
      // if(json.status_code === 200) 
        alert('Sprint Created');
        setStartDate(null);
        setEndDate(null);
        setCapacity(''); 
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading = 'Create Sprint'/>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <form
          onSubmit={handleCreateSprint}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Sprint Start Date"
              value={startDate}
              onChange={date => setStartDate(date)}
            />
          </MuiPickersUtilsProvider>
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Sprint End Date"
              value={endDate}
              onChange={date => setEndDate(date)}
            />
          </MuiPickersUtilsProvider>
          <br />
          <br />
          <TextField 
            value={capacity}
            label="Capacity"
            type="number"
            onChange={e => setCapacity(e.target.value)}
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Sprint
          </Button>
        </form>
        <br />
        <Copyright />   
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    projectID: state.projectID
  }
}

export default connect(mapStateToProps)(CreateSprint);