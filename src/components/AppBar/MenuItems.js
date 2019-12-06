import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { DoubleArrow, Create, Announcement } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const MenuItems = (props) => {
  const { isManager, projectID } = props;
  return (
    <div>
  {
    (isManager===true)? (
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
        to='/managerview' 
        style={{ textDecoration: 'none', color: 'black' }} 
        activeStyle={{
          fontWeight: "bold",
          color: "blue"
      }}>
        <ListItem button>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary="My Projects" />
        </ListItem>
      </NavLink>
    </div>
    ) 
    : 
    (
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
      {projectID && <NavLink 
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
      </NavLink>}
      {projectID && <NavLink 
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
      </NavLink>}
      {projectID && <NavLink 
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
      </NavLink>}
    </div>
    )}
  </div>
  );
  }

  const mapStateToProps = (state) => {
    console.log(state);
    return {
    isManager: state.isManager,
    id: state.id,
    projectID: state.projectID
  }}
  
  export default connect(mapStateToProps)(MenuItems);