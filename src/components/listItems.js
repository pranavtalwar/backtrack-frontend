import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';


export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemText inset= 'true' primary="Current Sprint" />
    </ListItem>
    <ListItem button>
      <ListItemText inset= 'true' primary="Create Sprint" />
    </ListItem>
    <ListItem button>
      <ListItemText inset= 'true' primary="Project Backlog" />
    </ListItem>
  </div>
);
