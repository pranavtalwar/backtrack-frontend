import React, { useState, useEffect } from 'react';
import { Button, CssBaseline,Paper, 
        InputLabel, TextField, MenuItem, Select, Container, Grid 
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
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
}));

export default () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [currPBI, setCurrPBI] = useState(null);
  const [pbiArray, setPbiArray] = useState([]);
  const url = "http://127.0.0.1:8000/pbi/";

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(json => setPbiArray(json));
  }, []);
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading = 'Create Sprint'/>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
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
                    format="MM/dd/yyyy"
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
            <br />
            <InputLabel>Select PBI</InputLabel>
            <Select
                style={{ width: 300 }}
                value={currPBI}
                onChange={e => setCurrPBI(e.target.value)}
            >
            {
                pbiArray.map(pbi => (
                  <MenuItem value={pbi.id}>{pbi.name}</MenuItem>
                ))
            }
            </Select>
        </form>
        <Copyright />   
      </div>
      
    </div>
  );
}