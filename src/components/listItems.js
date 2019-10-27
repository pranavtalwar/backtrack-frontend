import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { DoubleArrow, Create, Announcement } from '@material-ui/icons';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
  <Link to='/homepage'>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <DoubleArrow />
      </ListItemIcon>
      <ListItemText primary="Current Sprint" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Create />
      </ListItemIcon>
      <ListItemText primary="Create Sprint" />
    </ListItem>
    <Link to='/backlog'>
    <ListItem button>
      <ListItemIcon>
        <Announcement />
      </ListItemIcon>
      <ListItemText primary="Backlog" />
    </ListItem>
    </Link>
  </div>
);