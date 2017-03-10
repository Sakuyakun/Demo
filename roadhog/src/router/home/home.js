import React from 'react';
import { Link } from 'react-router';
import styles from './home.less';
import classNames from 'classnames/bind';

const homestyles = classNames.bind(styles)

class Home extends React.Component {
  render () {
    const main = homestyles('home-main')
    const title = homestyles('h1-title', 'title-color')
    const link = homestyles('link-title')

    return (
      <div className={main}>
        <header>
          <h1 className={title}>DEMO INDEX PAGE</h1>
        </header>

        <main>
          <Link className={link} to="/todolist">Todolist</Link>
        </main>
      </div>
    );
  }
}

export default Home;