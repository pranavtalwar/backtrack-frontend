import React from 'react';
import { Typography } from '@material-ui/core';

export default () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          BackTrack
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}