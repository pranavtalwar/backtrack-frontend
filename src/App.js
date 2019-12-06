import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import ProductBacklog from './components/ProductBacklog/ProductBacklog';
import CreateSprint from './components/CreateSprint';
import CurrentSprint from './components/CurrentSprint';
import CreateProject from './components/CreateProject';

import './App.css';
import ManagerView from './components/ManagerView';

import { connect } from 'react-redux';

const App = (props) => {
  console.log(props)
  const { isManager } = props;
  return (
    <BrowserRouter>
      <div className="App">
          {(isManager)? (
            <Switch>
              <Route path="/" exact component={Signin}/>
              <Route path="/managerview" component={ManagerView} />
              <Route path="/homepage" component={Homepage}/>
            </Switch>
          ):(
            <Switch>
              <Route path="/" exact component={Signin}/>
              <Route path="/homepage" component={Homepage}/>
              <Route path="/backlog" component={ProductBacklog}/>
              <Route path="/createsprint" component={CreateSprint} />
              <Route path="/currentsprint" component={CurrentSprint} />
              <Route path="/createproject" component={CreateProject} />
            </Switch>
          )
          }
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
  isManager: state.isManager,
  id: state.id,
}}

export default connect(mapStateToProps)(App);
