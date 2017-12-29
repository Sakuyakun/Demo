import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { css, withStyles } from "../withStyles";

// 顶部导航
@withRouter
@withStyles(({ color, unit }) => ({
  link: {
    color: color.text,
    fontSize: "20px",
    marginLeft: "30px"
  },
  link_hover: {
    color: color.linkhover
  },
  icon: {
    color: color.icon,
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-25px)"
  }
}))
export default class Navigation extends Component {
  render() {
    const { styles, location } = this.props;
    const icon_github = "fa fa-github fa-3x ";

    return (
      <div>
        <Link {...css(styles.link, location.pathname === "/" && styles.link_hover)} to="/">
          index
        </Link>

        <a href="#" target="_blank">
          <i className={icon_github + css(styles.icon).className} />
        </a>
      </div>
    );
  }
}
