import React, { useState, useEffect } from 'react';
import { CssBaseline, Table, TableBody, TableRow, TableCell, Paper, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import AppBar from './AppBar/AppBar';

const pbiList = {
  "start_date": "2019-10-19",
  "end_date": "2019-10-31",
  "capacity": 80,
  "project": 1,
  "pbis": [
    { "pbi_id": 6,
      "tasks": [{"description":  "Create", "effort_hours": 10},
           {"developer":  "2", "description":  "New", "effort_hours": 8}
      ]
    },
    { "pbi_id":5,
      "tasks": [{"description":  "Create", "effort_hours": 5},
           {"developer":  "2", "description":  "New", "effort_hours": 6}
      ]
    }
  ]
}

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
  const [pbiArray, setPbiArray] = useState([]);

  // const [addPbis, setAddPbis] = useState([]);
  // const hello = ({
  //   id: 12,
  //   name: "Make",
  // });

  const url = "http://127.0.0.1:8000/pbi/";

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(json => setPbiArray(json));
  }, []);

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading = 'Current Sprint'/>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <br/>
        <br/>
          <div className={classes.pbitext}>
          <div>
          <b> Project: </b>{pbiList.project}<br/>
            <b>Capacity: </b>{pbiList.capacity}<br/>
            <b>Start Date: </b> {pbiList.start_date} <br/>
            <b>End Date: </b> {pbiList.end_date} <br/>
          </div>
          { pbiList.pbis.length>0? (
              pbiList.pbis.map(row => (
                <>
                <div className={classes.newtext}>
                </div>
                <br/>
                PBI ID: {row.pbi_id} <br/>
                Tasks:
                {
                  (row.tasks.length>0)? (
                    <Paper className={classes.paper}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Effort</TableCell>
                            <TableCell></TableCell>
                          </TableRow>

                          {row.tasks.map(task => (
                            <TableRow>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.effort_hours}</TableCell>
                                <TableCell>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Complete
                                </Button> 
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                    </Paper>
                  ) : (
                    <>
                      <dig>
                        There are no Tasks added in this PBI.
                      </dig>
                    </>
                  )
                }
              </>
              ))): (
                <div>
                  <b>There are no PBIs added to Current Sprint</b>
                </div>
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