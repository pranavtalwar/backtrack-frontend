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
    height: '50vh',
  },
  header:{
    padding: theme.spacing(8),
},
}));

const Homepage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar heading='Homepage'/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isDeveloper: state.developer,
  projectID: state.projectID
})

export default connect(mapStateToProps)(Homepage);