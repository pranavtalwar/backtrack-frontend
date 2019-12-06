import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, Container, TextField, Box, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props)  => {
  const classes = useStyles();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const { history, dispatch } = props;
  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/rest-auth/login/", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password 
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log('json',json)
      if(json['key'] !== undefined) {
        localStorage.setItem('auth_token', json['key']);
        dispatch({ type: "SET", value: {
          isDeveloper: json.user_info.is_developer,
          isManager: json.user_info.is_manager,
          projectID: json.user_info.project_id,
          id: json.user_info_id
        }});
        history.push('/homepage');
      } else {
        setLoginError(true);
        console.log(loginError);
      }
    });
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          BackTrack Application
        </Typography>
        <form className={classes.form} 
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setUserName(e.target.value)}
            error={!!loginError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            error={!!loginError}
            helperText={loginError && 'Wrong Credentials'}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>   
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default connect((state) => ({}))(SignIn);