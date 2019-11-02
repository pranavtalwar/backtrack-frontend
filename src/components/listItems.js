import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { DoubleArrow, Create, Announcement } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

export const mainListItems = (
  <div>
    <NavLink 
      to='/homepage' 
      style={{ textDecoration: 'none', color: 'black' }} 
      activeStyle={{
        fontWeight: "bold",
        color: "blue"
    }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink 
      to='/currentsprint' 
      style={{ textDecoration: 'none', color: 'black' }} 
      activeStyle={{
        fontWeight: "bold",
        color: "blue"
    }}>
      <ListItem button>
        <ListItemIcon>
          <DoubleArrow />
        </ListItemIcon>
        <ListItemText primary="Current Sprint" />
      </ListItem>
    </NavLink>
    <NavLink 
      to='/createsprint' 
      style={{ textDecoration: 'none', color: 'black' }} 
      activeStyle={{
        fontWeight: "bold",
        color: "blue"
    }}>
    <ListItem button>
      <ListItemIcon>
        <Create />
      </ListItemIcon>
      <ListItemText primary="Create Sprint" />
    </ListItem>
    </NavLink>
    <NavLink 
      to='/backlog' 
      style={{ textDecoration: 'none', color: 'black' }} 
      activeStyle={{
        fontWeight: "bold",
        color: "blue"
    }}>
      <ListItem button>
        <ListItemIcon>
          <Announcement />
        </ListItemIcon>
        <ListItemText primary="Backlog" />
      </ListItem>
    </NavLink>
  </div>
);