import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import ProductBacklog from './components/ProductBacklog/ProductBacklog';
import CreateSprint from './components/CreateSprint';
import CurrentSprint from './components/CurrentSprint';
import CreateProject from './components/CreateProject';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path="/" exact component={Signin}/>
            <Route path="/homepage" component={Homepage}/>
            <Route path="/backlog" component={ProductBacklog}/>
            <Route path="/createsprint" component={CreateSprint} />
            <Route path="/currentsprint" component={CurrentSprint} />
            <Route path="/createproject" component={CreateProject} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
