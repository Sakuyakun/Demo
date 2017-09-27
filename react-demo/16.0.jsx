// https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html

import React, { Component } from 'react';
import styles from './demo.css';

const fragmentsRender = () => {
  return [
    // Don't forget the keys :)
    <div key="A">React Lightweight Boilerplate</div>,
    <div key="B">Second item</div>,
    <div key="C">Third item</div>,
  ];
};

const stringsRender = () => {
  return 'Look ma, no spans!'
};

export default class Demo extends Component {
  state = {
    hasError: false
  }
  render () {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return (
      <div className={styles.demo}>
        {
          fragmentsRender()
        }
        {
          stringsRender()
        }
      </div>
    );
  }

  componentDidCatch (error, info) {
    this.setState(prevState => ({
      hasError: !prevState.hasError
    }))
  }
}
