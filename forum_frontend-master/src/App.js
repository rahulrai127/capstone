import React , { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import HomeComponentEntry from './HomeComponentEntry'
import HeaderComponent from './HeaderComponent';
import NotFoundComponent from './NotFoundComponent';
import Register from './register'
import HomeComponentExit from './HomeComponentExit';
import HomeComponentCurrent from './HomeComponentCurrent.js';

function App() {
  return (
    <Router>
        <div>
          <HeaderComponent></HeaderComponent>

          <Switch>
            <Route exact path='/entry' component={HomeComponentEntry}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/exit' component={HomeComponentExit}></Route>
            <Route exact path='/current' component={HomeComponentCurrent}></Route>
            <Route component={NotFoundComponent}></Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;