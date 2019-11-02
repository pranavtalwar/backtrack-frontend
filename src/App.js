import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import ProductBacklog from './components/ProductBacklog/ProductBacklog';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path="/" exact component={Signin}/>
            <Route path="/homepage" component={Homepage}/>
            <Route path="/backlog" component={ProductBacklog}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
