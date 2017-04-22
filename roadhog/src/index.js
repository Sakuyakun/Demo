import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import styles from './index.less'

import Home from './router/home/home';
import HomeLayout from './layouts/HomeLayout';
import Project1 from './router/project1/project1';
import UserAdd from './router/user/add';
import UserList from './router/user/list';
import UserEditPage from './router/user/edit';
import BookList from './router/book/list';
import BookAdd from './router/book/add';
import BookEditPage from './router/book/edit';
import Login from './router/login/login';
import Demo from './router/demo/demo';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/demo" component={Demo}/>
    <Route path="/project1" component={Project1}/>
    <Route path="/project1/useradd" component={UserAdd}/>
    <Route path="/project1/userlist" component={UserList}/>
    <Route path="/project1/useredit/:id" component={UserEditPage}/>
    <Route path="/project1/bookadd" component={BookAdd}/>
    <Route path="/project1/booklist" component={BookList}/>
    <Route path="/project1/bookedit/:id" component={BookEditPage}/>
  </Router>
), document.getElementById('app'));