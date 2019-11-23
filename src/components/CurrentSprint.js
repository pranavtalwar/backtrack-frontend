import React, { useState, useEffect } from 'react';
import { CssBaseline, Table, TableBody, TableRow, TableCell, Paper, Button,
  InputLabel, MenuItem, Select,  TextField
} from '@material-ui/core';
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
  const [pbiArray, setPbiArray] = useState([]);
  const [currPBI, setCurrPBI] = useState(null);
  const [curTask, setCurTask] = useState({
    name: null,
    description: null,
    effort_hours: null,
  });
  const [currentSprint, setCurrentSprint] = useState({
      start_date: null,
      id: null,
      end_date: null,
      capacity: null,
      project: null,
      pbis: null
  });
  const [currentCapacity, setCurrentCapacity] = useState(0);

  const sample = {
    "id": 17,
    "start_date": "2019-11-21",
    "end_date": "2019-11-22",
    "capacity": 90,
    "project": 1,
    "pbis": [
        {
            "pbi_name": 'chaman',
            "pbi_id": 8,
            "tasks": [
                {
                    "id": 30,
                    "pbi": 8,
                    "description": "abc",
                    "name": "acnc",
                    "developer": null,
                    "effort_hours": 120,
                    "status": "not yet started"
                },
                {
                    "id": 31,
                    "pbi": 8,
                    "description": "abc10",
                    "name": "acnc10",
                    "developer": null,
                    "effort_hours": 120,
                    "status": "not yet started"
                }
            ]
        },
        {
          "pbi_name": 'chaman',
          "pbi_id": 8,
          "tasks": [
              {
                  "id": 30,
                  "pbi": 8,
                  "description": "abc",
                  "name": "acnc",
                  "developer": null,
                  "effort_hours": 120,
                  "status": "not yet started"
              },
              {
                  "id": 31,
                  "pbi": 8,
                  "description": "abc10",
                  "name": "acnc10",
                  "developer": null,
                  "effort_hours": 120,
                  "status": "not yet started"
              }
          ]
      }

    ]
};
const classes = useStyles();
  

const [burndown, setBurndown] = useState(0);
const [completed, setCompleted] = useState(0);

const url = "http://127.0.0.1:8000/pbi/";
const url2 = "http://127.0.0.1:8000/currentsprint/1";
const url3 = "http://127.0.0.1:8000/tasks/";

useEffect(() => {
  // getting pbis for selection
  fetch(url)
  .then(response => response.json())
  .then(json => setPbiArray(json));

  // getting current sprint details
  fetch(url2)
  .then(response => response.json())
  .then(json => setCurrentSprint(json.result));
}, []);

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
  } else if(curTask.description == null) {
    alert('Please add a task description');
    return;
  } else if (curTask.effort_hours == null) {
    alert('Please add a task effort');
    return;
  } else if (curTask.name == null) {
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
        return json;
    })
    .then(json => {
      fetch(url2)
      .then(response => response.json())
      .then(json => setCurrentSprint(json.result));
    });
  }

}


  let tmpBurndown = burndown;
  let tmpCompleted = completed;
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
          {/* <MenuItem value={hello}>Make Soup</MenuItem> */}
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
                {/* {reset()} */}
                <div className={classes.newtext}>
                </div>
                <br/>
                PBI Name: {row.pbi_name} <br/>
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
                            {/* pbiBurndown = pbiBurndown + task.effort_hours;
                            tmpBurndown = tmpBurndown + task.effort_hours;
                            if(task.status===true){
                              tmpCompleted = tmpCompleted + task.effort_hours;
                              pbiCompleted = pbiCompleted + task.effort_hours;
                            }
                            console.log("pbiBurndown " + pbiBurndown); */}
                            return(
                            <TableRow>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.effort_hours}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Complete
                                </Button> 
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
                {/* <b>PBI Completed: </b> {pbiCompleted} <br/>
                <b>PBI Burndown: </b> {pbiBurndown} <br/>
                <b>Leftover: </b> {pbiBurndown-pbiCompleted} */}
              </>
              ))
               
              ): (
                <div>
                  <b>There are no PBIs added to Current Sprint</b>
                </div>
              )
          }
          <br/>
        {/* <center>
        <b>Sprint Completed: </b>{tmpCompleted} <br/>
        <b>Sprint Burndown: </b>{tmpBurndown} <br/>
        <b>Leftover: </b> {tmpBurndown-tmpCompleted}
        </center> */}
        </div> 
        <br/>
        <br/>
        <br/>
        <Copyright />   
      </div> 
      
    </div>
  );
}