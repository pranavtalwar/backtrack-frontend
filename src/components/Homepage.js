import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Container, Typography, CssBaseline, Button, Card } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from './AppBar/AppBar';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    height: '100hv'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100hv',
  },
  card: {
    height: '100vh',
  },
  header:{
    padding: theme.spacing(8),
},
}));

const Homepage = (props) => {
  const classes = useStyles();
  const { projectID, isManager } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading='Homepage'/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        { (isManager)? (
          <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Card className={classes.card}>
                    <Typography color="inherit" variant="h4" className={classes.header} >
                      You are a project manager
                    </Typography>
                    <Typography color="inherit" variant="h6" className={classes.header} >
                      Go to 'My Projects' tab to view details
                    </Typography>
                  </Card>
                </Paper>
              </Grid>
            </Grid>

          ):
          (  <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                {
                  projectID !== null ? 
                  <Card className={classes.card}>
                    <Typography color="inherit" variant="h4" className={classes.header} >
                      You are already working on a project
                    </Typography> 
                  </Card>
                  :
                  <Card className={classes.card}>
                    <Typography color="inherit" variant="h4" className={classes.header} >
                      You don't seem to be working on any project.
                    </Typography>
                    <NavLink 
                        to='/createproject' 
                        style={{ textDecoration: 'none', color: 'black' }} 
                        activeStyle={{
                          fontWeight: "bold",
                          color: "blue"
                    }}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Create new project
                    </Button>
                    </NavLink>
                  </Card>
                }
                </Paper>
              </Grid>
            </Grid>
            )}
        </Container>
        <Copyright />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
  projectID: state.projectID,
  isManager: state.isManager
}}

export default connect(mapStateToProps)(Homepage);