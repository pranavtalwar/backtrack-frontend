import React from 'react';
import {ListItem, ListItemText } from '@material-ui/core';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemText inset = 'true' primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemText inset = 'true' primary="Current Sprint" />
    </ListItem>
    <ListItem button>
      <ListItemText inset = 'true' primary="Create Sprint" />
    </ListItem>
    <ListItem button>
      <ListItemText inset = 'true' primary="Project Backlog" />
    </ListItem>
  </div>
);
