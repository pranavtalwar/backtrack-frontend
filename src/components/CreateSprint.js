import React, { useState, useEffect } from 'react';
import { Button, CssBaseline,Paper, Table, TableBody, TableRow, TableCell,
        InputLabel, TextField, MenuItem, Select, Container, Grid, 
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
  newtext: {
    fontSize: 25,
  },
  pbitext: {
    fontSize: 18,
  },
}));

export default () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [pbiArray, setPbiArray] = useState([]);
  const [currPBI, setCurrPBI] = useState(null);
  const [pbiTasks, setPBITasks] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [curTask, setCurTask] = useState({
    description: null,
    effort: null,
  });

  // const [addPbis, setAddPbis] = useState([]);
  const hello = ({
    id: 12,
    name: "Make Soup",
  });

  const url = "http://127.0.0.1:8000/pbi/";

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(json => setPbiArray(json));
  }, []);

  const handlePBIAdd = (e) => {
    e.preventDefault();
    console.log(currPBI);
    if(currPBI!=null){
      if(pbiTasks.some(pbiTask => pbiTask.id === currPBI.id)){
        alert("Please select a different PBI")
      } else {
        setPBITasks([...pbiTasks, {
          id: currPBI.id,
          name: currPBI.name,
          tasks: []
        }]);
      }
    } else {
      alert("Please select a PBI")
    }
    setIsAdded(true);
    console.log(pbiTasks);
  }

  const handleTaskAdd = (e) => {
    e.preventDefault();
    const pbiIndex = pbiTasks.findIndex((pbiTask => pbiTask.id === currPBI.id));
    console.log("Hello");
    if(curTask.description!=null && curTask.effort!=null){
      pbiTasks[pbiIndex].tasks.push(curTask);
    } else if (curTask.description==null){
      alert("Please enter task description")
    } else {
      alert("Please enter task effort")
    }
    console.log(pbiTasks);
  }

  
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
                  <MenuItem value={pbi}>{pbi.name}</MenuItem>
                ))
            }
            <MenuItem value={hello}>Make Soup</MenuItem>
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handlePBIAdd}
            >
              Add
            </Button>
        </form>
        <br/>
        <br/>
          <div className={classes.pbitext}>
          {isAdded? 
            (
              pbiTasks.map(row => (
                <>
                <div className={classes.newtext}>
                Add Tasks: <br/>
                </div>
                <br/>
                ID: {row.id}  Name: {row.name} <br/>
                {
                  (row.tasks.length>0)? (
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell>Effort</TableCell>
                        </TableRow>

                        {row.tasks.map(task => (
                          <TableRow>
                              <TableCell>{task.description}</TableCell>
                              <TableCell>{task.effort}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                  ) : (
                    <></>
                  )
                }
                <form onSubmit={handleTaskAdd}>
                  <TextField 
                    multiline
                    label="Description"
                    onChange={e => setCurTask({ ...curTask, description: e.target.value })}
                  />
                  <TextField 
                    multiline
                    label="Effort"
                    onChange={e => setCurTask({ ...curTask, effort: e.target.value })}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add
                  </Button>
                </form>
              </>
              ))

            ):
            (
              <center>Please Add PBI</center>
            )
          }
        </div> 
        <br/>
        <br/>
        <br/>
        <Copyright />   
      </div>
      
    </div>
  );
}