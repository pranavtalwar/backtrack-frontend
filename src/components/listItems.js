import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { DoubleArrow, Create, Announcement } from '@material-ui/icons';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
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
    <ListItem button>
      <ListItemIcon>
        <Announcement />
      </ListItemIcon>
      <ListItemText primary="Backlog" />
    </ListItem>
  </div>
);