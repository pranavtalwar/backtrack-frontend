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
  card:{
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
      padding: theme.spacing(8),
  },
  button: {
    marginBottom: theme.spacing(10),

  },
  marginAutoContainer: {
    width: '80%',

    maxWidth:"md",
  },
  marginAutoItem: {
    margin: 'auto'
  },
}));

export default function Homepage() {
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

    <Card className={classes.card}>
    <Typography color="inherit" variant="h4" className={classes.header} >
        You don't seem to be working on any project.
    </Typography>
    <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon color="primary">add_circle</Icon>}//{<Icon className="fas fa-plus"/>}
      >
        Create new project
      </Button>

    </Card>
    </Container>
    </div>
  );
}