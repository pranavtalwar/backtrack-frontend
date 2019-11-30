import React, { useState, useEffect } from 'react';
import { Button, CssBaseline, InputLabel, TextField, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
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

const CreateProject = (props) => {
  const classes = useStyles();
  const { id } = props;
  const [projName, setProjName] = useState('');
  const [currDeveloper, setCurrDeveloper] = useState({
    id: null,
    user: null,
    name: null,
    project: null,
    role: null
  });
  const [currManager, setCurrManager] = useState({
    id: null,
    user: null,
    name: null,
  });
  const [developers, setDevelopers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const url = "http://localhost:8000/";

  useEffect(() => {
    fetch(url + 'developers/')
    .then(response => response.json())
    .then(json => {
      const newJSON = json.filter((dev) => dev.id !== id);
      return newJSON;
    })
    .then(newJSON => {
      setDevelopers(newJSON);
    })
    fetch(url + 'managers/')
    .then(response => response.json())
    .then(json => setManagers(json));
  }, [id]);

  console.log(developers)


  const addDeveloper = (dev) => {
    let found = false;
    for (let i =0; i< selectedDevelopers.length; i++) {
      if(selectedDevelopers[i].id === dev.id) {
        found = true;
      }
    }
    if(found) {
      alert("Developer already added")
    } else {
      const array = selectedDevelopers;
      array.push(dev);
      setSelectedDevelopers(array);
      console.log('selected',selectedDevelopers);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(projName === '') {
      alert('Please enter a project name');
      return;
    } 
    else if (selectedDevelopers.length === 0) {
      alert('Please select some developers');
      return;
    }
    else if (currManager.id === null || currManager.name === null || currManager.user === null) {
      alert('Please select a manager');
      return;
    }
    else {
      const developersIDs = [];
      for(let i = 0; i < selectedDevelopers.length; i++) {
        developersIDs.push(selectedDevelopers[i].id);
      }
      fetch(url + 'project/', {
        method: 'POST',
        body: JSON.stringify({
          manager: currManager.id,
          name: projName,
          developers: developersIDs
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        if(json.status_code === 201) {
          alert('Project created');
          setProjName('');
          setCurrDeveloper({
            id: null,
            user: null,
            name: null,
            project: null,
            role: null
          });
          setCurrManager({id: null,
            user: null,
            name: null
          });
        }
      })
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading = 'Create Sprint'/>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <form
          onSubmit={handleSubmit}
        >
          <br />
          <br />
          <br />
          <TextField 
            value={projName}
            label="Project Name"
            type="text"
            onChange={e => setProjName(e.target.value)}
          />
          <br />
          <br />
          <InputLabel>Select Developers</InputLabel>
          <Select
              style={{ width: 300 }}
              value={currDeveloper}
              onChange={e => {
                setCurrDeveloper(e.target.value);
                console.log(currDeveloper)
              }}
          >
          {
              developers.map(developer => (
                <MenuItem value={developer}>{developer.name}</MenuItem>
              ))
          }
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick = { e => {
              addDeveloper(currDeveloper); 
              console.log(selectedDevelopers);
              setCurrDeveloper('');
              }}
          >
            Add
          </Button>
          <div>
            <b>Developers Added:</b>
            <br/>
            {selectedDevelopers.map(developer => (
              <div>
                {developer.name}<br/>
              </div>
              ))
            }
          </div>
          <br/>
          <br/>
          <InputLabel>Select Manager</InputLabel>
          <Select
              style={{ width: 300 }}
              value={currManager}
              onChange={e => {
                setCurrManager(e.target.value);
                console.log(currManager)
              }}
          >
          {
              managers.map(manager => (
                <MenuItem value={manager}>{manager.name}</MenuItem>
              ))
          }
          </Select>
          <br/>
          <br/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Project
          </Button>
        </form>
        <br />
        <Copyright />   
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.id
})

export default connect(mapStateToProps)(CreateProject);