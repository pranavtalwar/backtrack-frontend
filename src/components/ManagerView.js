import React, { useState, useEffect } from 'react';
import { CssBaseline, Table, TableBody, TableHead, TableRow, TableCell, Paper, Button,
  InputLabel, MenuItem, Select,  TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import AppBar from './AppBar/AppBar';
import AppBar2 from '@material-ui/core/AppBar';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

function a11yProps(index) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
    <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && <Box p={3}>{children}</Box>}
    </Typography>
);
}
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};
export default () => {
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
    setValue(newValue);
};
//   const [pbiArray, setPbiArray] = useState([]);
//   const [currPBI, setCurrPBI] = useState(null);
//   const [curTask, setCurTask] = useState({
//     name: '',
//     description: '',
//     effort_hours: 0,
//   });
//   const [currentSprint, setCurrentSprint] = useState({
//       start_date: null,
//       id: null,
//       end_date: null,
//       capacity: null,
//       project: null,
//       pbis: null
//   });
//   const [currentCapacity, setCurrentCapacity] = useState(0);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [updateObj, setUpdateObj] = useState({
//       id: '',
//       name: '',
//       description: '',
//       effort_hours: 0,
//   });

//   const handleClickOpen = () => {
//       setDialogOpen(true);
//   };
  
//   const handleClose = () => {
//       setDialogOpen(false);
//   };

  const classes = useStyles();
  const projArray = ["First Project","Second Project","Third Project","Fourth Project"];
  const pbis =  [
      { 
        "pbi_id": 6,
        "name": "FirstPBI",
        "description": "This is the first one",
        "priority": 2,
        "story_points": 30,
        "sprint_id": 1,
        "status": "Not Yet Started"
      },
      { 
        "pbi_id": 7,
        "name": "SecondPBI",
        "description": "This is the second one",
        "priority": 1,
        "story_points": 50,
        "sprint_id": 1,
        "status": "In Progress"
      },
      { 
        "pbi_id": 8,
        "name": "thirdPBI",
        "description": "This is the third one",
        "priority": 3,
        "story_points": 50,
        "sprint_id": 1,
        "status": "Completed"
      }

    ];

  const [currProj, setCurrProj] = useState('');
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading = 'Manager View'/>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <br/>
        <br/>
        <br/>
        <br/>


        <form>
          <InputLabel>Select Project</InputLabel>
          <Select
              style={{ width: 300 }}
              value={currProj}
              onChange={e => {
                setCurrProj(e.target.value);
                console.log(currProj)
              }}
          >
          {
              projArray.map(proj => (
                <MenuItem value={proj}>{proj}</MenuItem>
              ))
          }
          </Select>
        </form>
        <br/>
        <br/>

        <div className={classes.pbitext}>
        {(currProj!=='')? (
        <div>
        <AppBar2 position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Current View" {...a11yProps(0)} />
            <Tab label="Full View" {...a11yProps(1)} />
            </Tabs>
        </AppBar2>
        <TabPanel value={value} index={0}>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Story Point</TableCell>
                <TableCell>Sprint ID</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {pbis.map(row => ( 
                (row.status==="Not Yet Started" || row.status==="In Progress")?(
                <TableRow key={row.id}> 
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>{row.story_points}</TableCell>
                    {row.sprint_id ? <TableCell>{row.sprint_id}</TableCell> : <TableCell>Not Assigned</TableCell>}
                    <TableCell>{row.status}</TableCell>
                    </TableRow>
            ):(
                <>
                </>
            )
            ))}
                </TableBody>
            </Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Story Point</TableCell>
                <TableCell>Sprint ID</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {pbis.map(row => ( 
                <TableRow key={row.id}> 
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>{row.story_points}</TableCell>
                    {row.sprint_id ? <TableCell>{row.sprint_id}</TableCell> : <TableCell>Not Assigned</TableCell>}
                    <TableCell>{row.status}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TabPanel>
            
        </div>
        ):(
            <dig>
            <b><center>SELECT A PROJECT TO VIEW</center></b>
            </dig>
        )}
        <br/>
        </div> 
        <br/>
        <br/>
        <br/>
        <Copyright />   
      </div> 
      </div>
    );
}