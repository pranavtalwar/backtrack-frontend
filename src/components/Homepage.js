import React from 'react';
import { AppBar, Button, Card, Container, Icon, IconButton, Toolbar, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';


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

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar pagename = 'HomePage' />
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