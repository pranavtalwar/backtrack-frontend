import React, { useState, useEffect } from 'react';
import { CssBaseline, Table, TableBody, TableRow, TableCell, Paper, Button,
  InputLabel, MenuItem, Select,  TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import AppBar from './AppBar/AppBar';
import { connect } from 'react-redux';

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
  paper2: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    // flexDirection: 'column',
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
  pad: {
    paddingRight: 200,
  },
  pad2: {
    paddingRight: 240,
  }
}));



const CurrentSprint = (props) => {
  const { id, projectID } = props; 
  const [pbiArray, setPbiArray] = useState([]);
  const [currPBI, setCurrPBI] = useState(null);
  const [checker, setChecker] = useState(false);
  const [curTask, setCurTask] = useState({
    name: '',
    description: '',
    effort_hours: 0,
  });
  const [currentSprint, setCurrentSprint] = useState({
      start_date: null,
      id: null,
      end_date: null,
      capacity: null,
      project: null,
      pbis: null
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateObj, setUpdateObj] = useState({
      id: '',
      name: '',
      description: '',
      effort_hours: 0,
  });

  const handleClickOpen = () => {
      setDialogOpen(true);
  };
  
  const handleClose = () => {
      setDialogOpen(false);
  };

  const classes = useStyles();

  const url = "http://127.0.0.1:8000/pbis_in_project/?id=" + projectID;
  const url4 = "http://127.0.0.1:8000/pbi/";
  const url2 = "http://127.0.0.1:8000/currentsprint/" + projectID;
  const url3 = "http://127.0.0.1:8000/tasks/";

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(json => setPbiArray(json.result));

    fetch(url2)
    .then(response => response.json())
    .then(json => {
      if(json.status_code === 406) {
        setChecker(true);
      }
      else {
        setCurrentSprint(json.result);
      }
    });
  }, [url, url2]);

const handleTaskCreate = e => {
  e.preventDefault();
  const sprintPBIs = currentSprint.pbis;
  let totalCapacity = 0;
  for(let i = 0; i < sprintPBIs.length; i++) {
    let pbiTasks = sprintPBIs[i].tasks;
    for(let j = 0; j < pbiTasks.length; j++) {
      totalCapacity += pbiTasks[j].effort_hours;
    }
  }
  if(currPBI == null) {
    alert('Please select a PBI');
    return;
  } else if(curTask.description === '') {
    alert('Please add a task description');
    return;
  } else if (curTask.effort_hours === 0) {
    alert('Please add a task effort');
    return;
  } else if (curTask.name === '') {
    alert('Please add a task name');
    return;
  } else if (parseInt(curTask.effort_hours) + totalCapacity > currentSprint.capacity) {
    console.log(parseInt(curTask.effort_hours) + totalCapacity)
    alert('The effort hours are exceeding the total capacity of the sprint');
    return;
  } else {
    fetch(url3, {
      method: 'POST',
      body: JSON.stringify({
          pbi_id: currPBI.id,
          sprint_id: currentSprint.id,
          ...curTask
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json)
    .then(json => {
      // if(json.status_code === 200) 
        alert('Task Created');
        setCurTask({
          name: '',
          description:'',
          effort_hours: 0 
      });
        setCurrPBI(null);
        return json;
    })
    .then(json => {
      fetch(url2)
      .then(response => response.json())
      .then(json => {
        console.log(json.result)
        setCurrentSprint(json.result)});
    });
  }
}


const handleTaskDelete = id => {
  fetch(url3 + id + '/', {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(json => {
    if(json.status_code === 200) {
      console.log('deleted');
      fetch(url2)
      .then(response => response.json())
      .then(json => setCurrentSprint(json.result));
    }
  });
}

const handlePBIRemoval = id => {
  fetch(url4 + id + '/', {
    method: 'PATCH',
    body: JSON.stringify({
      status: "Not Yet Started",
      sprint_id: null
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    if(json.status_code === 200) {
      fetch(url2)
      .then(response => response.json())
      .then(json => setCurrentSprint(json.result));
    }
  });
}

const handleTaskCompletion = id => {
  fetch(url3 + id + '/', {
    method: 'PATCH',
    body: JSON.stringify({
      status: "COMPLETED",
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    if(json.status_code === 200) {
      fetch(url2)
      .then(response => response.json())
      .then(json => setCurrentSprint(json.result));
    }
  });
}

const handleTaskUpdate = (id, name, description, effort_hours) => {
  const sprintPBIs = currentSprint.pbis;
  let totalCapacity = 0;
  for(let i = 0; i < sprintPBIs.length; i++) {
    let pbiTasks = sprintPBIs[i].tasks;
    for(let j = 0; j < pbiTasks.length; j++) {
      if(pbiTasks[j].id !== id)
      totalCapacity += pbiTasks[j].effort_hours;
    }
  }
  if(parseInt(effort_hours) + totalCapacity > currentSprint.capacity) {
    alert('The effort hours are exceeding the total capacity of the sprint');
    return;
  } else {
    fetch(url3 + id + '/', {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        name,
        description,
        effort_hours
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if(json.status_code === 200) {
        fetch(url2)
        .then(response => response.json())
        .then(json => setCurrentSprint(json.result));
      }
    });
  }
}

const handleTaskOwnership = (id, taskId)=> {
  fetch(url3 + taskId + '/', {
    method: 'PATCH',
    body: JSON.stringify({
      developer: id,
      status: "ONGOING"
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    if(json.status_code === 200) {
      fetch(url2)
      .then(response => response.json())
      .then(json => setCurrentSprint(json.result));
    }
  });
}

  let tmpBurndown = 0;
  let tmpCompleted = 0;
  let pbiBurndown = 0;
  let pbiCompleted = 0;
  const reset = () => {
    pbiBurndown = 0;
    pbiCompleted = 0;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading = 'Current Sprint'/>
      {
        checker ? ( 
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.appBarSpacer} />
          <div className={classes.pbitext}>
            <b>Please create a Sprint or your previous sprint must have ended</b>
          </div>
        </div>
        )
        :
        (
          <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        
        <br/>
        <br/>
        <div className={classes.pbitext}>
          <b>Project: </b>{currentSprint.project}<br/>
          <b>Capacity: </b>{currentSprint.capacity}<br/>
          <b>Start Date: </b> {currentSprint.start_date} <br/>
          <b>End Date: </b> {currentSprint.end_date} <br/>
        </div>
        <br/>
        <br/>
        <form
          onSubmit={handleTaskCreate}
        >
          <InputLabel>Select PBI</InputLabel>
          <Select
              style={{ width: 300 }}
              value={currPBI}
              onChange={e => {
                setCurrPBI(e.target.value);
                console.log(currPBI)
              }}
          >
          {
              pbiArray.map(pbi => (
                <MenuItem value={pbi}>{pbi.name}</MenuItem>
              ))
          }
          </Select>
          <br />
          <br />
          <TextField 
            label="Task Name"
            value={curTask.name}
            onChange={e => setCurTask({ ...curTask, name: e.target.value })}
          />
          <br />
          <br />
          <TextField 
            multiline
            value={curTask.description}
            label="Description"
            onChange={e => setCurTask({ ...curTask, description: e.target.value })}
          />
          <br />
          <br />
          <TextField
            type="number" 
            value={curTask.effort_hours}
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
            Create Task
          </Button>
        </form>
        <div className={classes.pbitext}>
          {(currentSprint.pbis && currentSprint.pbis.length>0) ? (
              currentSprint.pbis.map(row => (
                <>
                {reset()}
                <div className={classes.newtext}>
                </div>
                <br/>
                PBI Name: {row.name} 
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => handlePBIRemoval(row.pbi_id)}
                >
                  Delete
                </Button> 
                <br/>
                Tasks:
                {
                  (row.tasks.length>0)? (
                    <div>
                    <Paper className={classes.paper}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Effort</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                          </TableRow>

                          {row.tasks.map(task => {
                            pbiBurndown = pbiBurndown + task.effort_hours;
                            tmpBurndown = tmpBurndown + task.effort_hours;
                            if(task.status==="COMPLETED"){
                              tmpCompleted = tmpCompleted + task.effort_hours;
                              pbiCompleted = pbiCompleted + task.effort_hours;
                            }
                            console.log("pbiBurndown " + pbiBurndown);
                            return(
                            <TableRow>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.effort_hours}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                { (id===task.developer || (task.status!== "COMPLETED" && id===task.developer))?
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      color="primary"
                                      onClick={() => handleTaskCompletion(task.id)}
                                      disabled = {id!==task.developer || task.status==="COMPLETED"}
                                    >
                                      Complete
                                  </Button> :
                                  <>
                                  </>
                                  }
                              </TableCell>
                              <TableCell>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={task.status==="COMPLETED" || (task.developer !== null && task.developer !== id)}
                                    onClick={() => {
                                      setUpdateObj({
                                        name: task.name,
                                        description: task.description,
                                        effort_hours: task.effort_hours,
                                        id: task.id
                                      });
                                      handleClickOpen();
                                    }}
                                  >
                                  Update
                                </Button> 
                              </TableCell>
                              <TableCell>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={task.status==="COMPLETED" || (task.developer !== null && task.developer !== id)}
                                    onClick={() => handleTaskDelete(task.id)}
                                  >
                                  Delete
                                </Button> 
                              </TableCell>
                              <TableCell>
                                 { 
                                   (task.developer===null)?
                                   <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={()=> handleTaskOwnership(id, task.id)}>
                                    Ownership
                                  </Button> :
                                  <>
                                    {id===task.developer ? <p>You are working on this</p> : <p>Another developer is working on this</p>}
                                    
                                  </>
                                }
                              </TableCell>
                            </TableRow>
                          )})}
                      </TableBody>
                      </Table>
                    </Paper>
                    </div>
                  ) : (
                    <>
                      <dig>
                        There are no Tasks added in this PBI.
                      </dig>
                    </>
                  )
                }
                <Paper className={classes.paper2}>
                  <div className = {classes.pad}>
                    <b>PBI Completed: </b> {pbiCompleted} 
                  </div>
                  <div className = {classes.pad}>
                    <b>PBI Burndown: </b> {pbiBurndown} 
                  </div>
                  <b>Leftover: </b> {pbiBurndown-pbiCompleted}
                </Paper>
              </>
              ))
               
              ): (
                <div>
                  <b>There are no PBIs added to Current Sprint</b>
                </div>
              )
          }
          <br/>
        <center>
        <h2><b>Sprint:</b></h2>
        <Paper className={classes.paper2}>
          <div className = {classes.pad2}>
            <b>Completed: </b>{tmpCompleted} 
          </div>
          <div className = {classes.pad2}>
            <b>Burndown: </b>{tmpBurndown} 
          </div>
            <b>Leftover:  </b> {tmpBurndown-tmpCompleted}
          <br/>
        </Paper>
        </center>
        </div> 
        <br/>
        <br/>
        <br/>
        <Copyright />   
      </div>
        )
      }
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth={"md"} fullWidth={true} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update PBI</DialogTitle>
            <DialogContent>
            <TextField
                value={updateObj.name}
                onChange={e => setUpdateObj({ ...updateObj, name: e.target.value })}
                autoFocus
                margin="dense" 
                fullWidth
                label="Name"
            />
            <br />
            <TextField 
                value={updateObj.description}
                onChange={e => setUpdateObj({ ...updateObj, description: e.target.value })}
                autoFocus
                margin="dense"
                fullWidth
                multiline
                label="Description"
            />
            <br />
            <TextField 
                value={updateObj.effort_hours}
                onChange={e => setUpdateObj({ ...updateObj, effort_hours: e.target.value })}
                autoFocus
                type="number"
                margin="dense"
                fullWidth
                multiline
                label="Effort Hours"
            />
            <br />
            <br />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => {
                handleTaskUpdate(updateObj.id, updateObj.name, updateObj.description, updateObj.effort_hours);
                handleClose();
              }
            } 
            color="primary">
                Update
            </Button>
            </DialogActions>
         </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    id: state.id,
    projectID: state.projectID
  }
}


export default connect(mapStateToProps)(CurrentSprint);