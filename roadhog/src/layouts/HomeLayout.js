import React from 'react';

class HomeLayout extends React.Component {
  render () {
    const {title, children, rootStyle, titleStyle} = this.props;
    return (
      <div className={rootStyle}>
        <header>
          <h1 className={titleStyle}>{title}</h1>
        </header>

        <main>
          {children}
        </main>
      </div>
    );
  }
}

export default HomeLayout;