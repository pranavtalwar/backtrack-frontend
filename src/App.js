import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import ProductBacklog from './components/ProductBacklog';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path="/login" component={Signin}/>
            <Route path="/" exact component={Homepage}/>
            <Route path="/productBacklog" component={ProductBacklog}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
