import React from 'react';
import { Link } from 'react-router';
import styles from './home.less';
import classNames from 'classnames/bind';
import HomeLayout from '../../layouts/HomeLayout'

const homestyles = classNames.bind(styles)

class Home extends React.Component {
  render () {
    const main = homestyles('home-main')
    const title = homestyles('h1-title', 'title-color')
    const link = homestyles('link-title')

    return (
      <HomeLayout title="DEMO INDEX PAGE" rootStyle={main} titleStyle={title}>
        <Link className={link} to="/demo">Demo</Link>
        <Link className={link} to="/project1">project1</Link>
      </HomeLayout>
    );
  }
}

export default Home;