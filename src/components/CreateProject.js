
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  form:{
      width: "100%",
      height: "60%",
      marginTop: theme.spacing(10),
      display:"flex",
      flexDirection:"column",
      alignItems: "center",
      justifyContent: "center",
      justifyItems:"center",
  },
  header:{
      padding: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(10),
    marginTop:theme.spacing(3),

  },
  marginAutoContainer: {
    width: '80%',
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
    justifyItems:"center",
    maxWidth:"md",
  },
  marginAutoItem: {
    margin: 'auto'
  },
  textfield:{
      width:"80%",
      marginTop: theme.spacing(3),
  }
}));

export default function CreateProject() {
  const classes = useStyles();

  return (

    //if there is no project yet
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Developer
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

    <Container className={classes.marginAutoContainer}>
    

    <FormControl className={classes.form}>
    <Typography color="inherit" variant="h4" className={classes.header} >
       Create New Project
    </Typography>
    <TextField
        id="outlined-full-width"
        label="Project Name"
        className={classes.textfield}
        placeholder="Enter Project Name"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    <TextField
        id="outlined-full-width"
        label="Invite manager"        
        className={classes.textfield}
        placeholder="Enter manager's email"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
        <Input
          id="input-with-icon-adornment"
          placeholder="Invite Developers"
          
        className={classes.textfield}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />

<TextField
        id="outlined-textarea"
        label="Project Details"
        placeholder="Input description"
        className={classes.textfield}
        multiline
        variant="outlined"
      />
        
    <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon color="primary">add_circle</Icon>}//{<Icon className="fas fa-plus"/>}
      >
        Create new project
      </Button>
      </FormControl>
    </Container>

    </div>
  );
}