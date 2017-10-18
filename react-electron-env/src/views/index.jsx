import React, { Component } from "react";
import { css, withStyles } from "../withStyles";

@withStyles(({ color }) => ({
  title: {
    color: color.text,
    fontSize: "50px",
    fontWeight: "100",
    "-webkit-font-smoothing": "antialiased",
    "-webkit-text-stroke": "1px white",
    "-webkit-text-fill-color": "transparent",
    transform: "translateY(-75px)"
  },
  index: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
}))
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { styles } = this.props;
    return (
      <div {...css(styles.index)}>
        <span {...css(styles.title)}>Yxorha Boilerplate</span>
      </div>
    );
  }
}
