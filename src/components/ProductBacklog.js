import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { AppBar, Button, CssBaseline, Drawer, Divider, Paper, 
         IconButton, InputLabel, List, Toolbar, Typography, TextField, MenuItem, Select, Container, Grid 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import PBIList from './PBIList';
import Copyright from './Copyright';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimate, setEstimate] = useState(0);
  const [priority, setPriority] = useState(0);
  const [pbiArray, setPbiArray] = useState([]);
  const priorityList = [1,2,3,4,5,6,7,8,9,10];
  const url = "http://127.0.0.1:8000/pbi/";

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(json => setPbiArray(json));
  }, []);

  const validation = () => {
    if(name==='' || description === '' || estimate === 0 || priority === 0) {
      return false;
    }
    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(validation()) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name, description, estimate, priority
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if(json.status_code === 201) {
          console.log('created')
          fetch(url)
          .then(getResponse => getResponse.json())
          .then(getJson => setPbiArray(getJson))
        }
      });
     
      setName('');
      setDescription('');
      setPriority(0);
      setEstimate(0); 
    }
  };

  const handleDelete = (id) => {
    fetch(url + id + '/', {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json.status_code === 200) {
        console.log('deleted')
        fetch(url)
        .then(getResponse => getResponse.json())
        .then(getJson => setPbiArray(getJson))
      }
    })
  }

  const handleUpdate = (id, updateName, updateDescription, updateEstimate, updatePriority) => {
    fetch(url + id + '/', {
      method: 'PATCH',
      body: JSON.stringify({
        name: updateName,
        description: updateDescription,
        estimate: updateEstimate,
        priority: updatePriority
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json.status_code === 200) {
        console.log('updated')
        fetch(url)
        .then(getResponse => getResponse.json())
        .then(getJson => setPbiArray(getJson))
      }
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Product Backlog
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <form
          onSubmit={handleSubmit}
        >
          <TextField 
            fullWidth
            value={name}
            label="Name"
            onChange={e => setName(e.target.value)}
          />
          <br />
          <TextField 
            fullWidth
            multiline
            value={description}
            label="Description"
            onChange={e => setDescription(e.target.value)}
          />
          <br />
          <br />
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            {
              priorityList.map(priorityItem => (
                <MenuItem value={priorityItem}>{priorityItem}</MenuItem>
              ))
            }
          </Select> 
          <br />
          <br />
          <InputLabel>Estimate</InputLabel>
          <Select
            value={estimate}
            onChange={e => setEstimate(e.target.value)}
          >
            {
              priorityList.map(priorityItem => (
                <MenuItem value={priorityItem}>{priorityItem}</MenuItem>
              ))
            }
          </Select>
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Create PBI
          </Button> 
        </form>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <PBIList pbis={pbiArray} deletePBI={handleDelete} updatePBI={handleUpdate}/>
                </Paper>
              </Grid>
            </Grid>
        </Container>
        <Copyright />
      </div>
    </div>
  );
}