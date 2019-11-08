import React, { useState, useEffect } from 'react';
import { Button, CssBaseline, Table, TableBody, TableRow, TableCell,
        InputLabel, TextField, MenuItem, Select, Container, Grid, Paper
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
  const [curTask, setCurTask] = useState({
    description: null,
    effort_hours: null,
  });

  const url = "http://127.0.0.1:8000/pbi/";
  const url2 = "http://127.0.0.1:8000/sprint/";

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(json => setPbiArray(json));
  }, []);

  const handlePBIAdd = (e) => {
    e.preventDefault();
    if(currPBI !== null){
      if(pbiTasks.some(pbiTask => pbiTask.id === currPBI.id)){
        alert("Please select a different PBI")
      } else {
        setPBITasks([...pbiTasks, {
          pbi_id: currPBI.id,
          tasks: []
        }]);
      }
    } else {
      alert("Please select a PBI");
    }
    setCurrPBI(null);
    console.log(pbiTasks);
  }

  const handleTaskAdd = (e,id) => {
    e.preventDefault();
    const pbiIndex = pbiTasks.findIndex((pbiTask => pbiTask.id === id));
    const newPBITasks= [...pbiTasks];
    if(curTask.description !== null && curTask.effort_hours !== null) {
      newPBITasks[pbiIndex].tasks.push(curTask);
      setPBITasks(newPBITasks);
    } else if (curTask.description == null) {
      alert("Please enter task description")
    } else {
      alert("Please enter task effort")
    }
    setCurTask({
      description: null,
      effort_hours: null
    });
  }

  const handleRemovePBI = (pbiID) => {
    const pbiIndex = pbiTasks.findIndex((pbiTask => pbiTask.id === pbiID));
    const newPBITasks = [...pbiTasks];
    newPBITasks.splice(pbiIndex, 1);
    setPBITasks(newPBITasks);
  }

  const handleTaskDelete = (pbiId, index) => {
    const pbiIndex = pbiTasks.findIndex((pbiTask => pbiTask.id === pbiId));
    const newPBITasks = [...pbiTasks];
    newPBITasks[pbiIndex].tasks.splice(index, 1);
    setPBITasks(newPBITasks);
  }

  const handleCreateSprint = () => {
    let checker = false;
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
    else if(pbiTasks.length === 0) {
      alert('Please select one or more PBIs to add to this sprint');
      return;
    }
    else if(pbiTasks.length > 0) {   
      for(let i = 0; i < pbiTasks.length; i++) {
        if(pbiTasks[i].tasks && (pbiTasks[i].tasks.length === 0)) {
          checker = true;
          break;
        }
      }
      if(checker) {
        alert('One of the PBIs you have added has no tasks associated with it');
        return;
      }
      else {
        let pbiTaskEffortSum = 0;
        for(let i = 0; i < pbiTasks.length; i++) {
          for(let j = 0; j < pbiTasks[i].tasks.length; j++) {
            pbiTaskEffortSum += parseInt(pbiTasks[i].tasks[j].effort_hours, 10);
          }
        }
        if(pbiTaskEffortSum > capacity) {
          alert('Your total Task Effort is exceeding the capacity');
          return;
        }
      }
    }
    console.log(JSON.stringify({
      start_date: startDate.toISOString().substring(0,10),
      end_date: endDate.toISOString().substring(0,10),
      capacity: capacity,
      project: 1,
      pbis: pbiTasks
    }));
    fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        start_date: startDate.toISOString().substring(0,10),
        end_date: endDate.toISOString().substring(0,10),
        capacity: capacity,
        project: 1,
        pbis: pbiTasks
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json)
    .then(json => {
      alert('Sprint Created');
      setStartDate(null);
      setEndDate(null);
      setCapacity(null);
      setPbiArray([]);
      setPBITasks([]);
      setCurrPBI(null);
      setCurTask(null);
    });
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
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handlePBIAdd}
            >
              Add
            </Button>
            <br />
        </form>
        <br/>
        <br/>
        <div className={classes.pbitext}>
          {pbiTasks.length > 0 ? 
            (
              pbiTasks.map(row => (
                <React.Fragment>
                  <div className={classes.newtext}>
                    Add Tasks for: {row.name}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => handleRemovePBI(row.id)}
                    >
                      Remove PBI
                    </Button>
                  </div>
                  <br/>
                  {
                    (row.tasks.length > 0) && (
                      <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Paper className={classes.paper}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Description</TableCell>
                                  <TableCell>Effort</TableCell>
                                </TableRow>

                                {row.tasks.map((task, index) => (
                                  <TableRow>
                                      <TableCell>{task.description}</TableCell>
                                      <TableCell>{task.effort_hours}</TableCell>
                                      <TableCell>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleTaskDelete(row.id, index)}
                                        >
                                            Delete
                                        </Button> 
                                    </TableCell>
                                  </TableRow>
                                ))}
                                </TableBody>
                              </Table>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Container>
                    )
                  }
                  <form onSubmit={(e) => handleTaskAdd(e, row.id)}>
                    <TextField 
                      multiline
                      label="Description"
                      onChange={e => setCurTask({ ...curTask, description: e.target.value })}
                    />
                    <br />
                    <TextField 
                      type="number"
                      label="Effort"
                      onChange={e => setCurTask({ ...curTask, effort_hours: e.target.value })}
                    />
                    <br />
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Add Task
                    </Button>
                    <br />
                    <br />
                  </form>
                </React.Fragment>
              ))
            ):
            (
              <center>Please Add PBI</center>
            )
        }
        </div> 
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleCreateSprint}
        >
          Create Sprint
        </Button>
        <br/>
        <br/>
        <br/>
        <Copyright />   
        </div>
    </div>
  );
}