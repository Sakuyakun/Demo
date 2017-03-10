import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from './router/home/home';
import Todolist from './router/todolist/todolist';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="/todolist" component={Todolist}/>
  </Router>
), document.getElementById('app'));