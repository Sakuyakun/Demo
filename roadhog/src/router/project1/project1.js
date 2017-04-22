import React, { Component } from 'react';
import { Link } from 'react-router';
import HomeLayout from '../../layouts/HomeLayout'

class Project1 extends Component {
  constructor () {
    super();
  }
  componentWillMount () {
  }
  render () {
    return (
      <HomeLayout title="project user">
        <Link to="/project1/useradd">添加用户</Link>
        <br/>
        <Link to="/project1/userlist">用户列表</Link>
        <br/>
        <Link to="/project1/bookadd">添加图书</Link>
        <br/>
        <Link to="/project1/booklist">图书列表</Link>
      </HomeLayout>
    );
  }
}

export default Project1;