import React, { Component } from "react";
import { css, withStyles } from "./withStyles";
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

// Router
import Navigation from "./views/navigation";
import Index from "./views/index";
import About from "./views/about";
import ExamplePage from "./views/examplePage";
import NoMatch from "./views/404";

// 背景图
import hotaru from "./assets/images/64495434_p0.jpg";

@withRouter
@withStyles(({ color }) => ({
  view: {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    background: `url(${hotaru})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  toparea: {
    height: "100px",
    width: "100%",
    lineHeight: "100px",
    background: "rgba(0,0,0,.4)",
    boxShadow: "0px -2px 2px 3px rgba(0, 0, 0, .4)",
    position: "fixed",
    zIndex: "2"
  },
  bottomarea: {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    width: "100%",
    height: "100%",
    zIndex: "1",
    padding: "130px 30px 30px 30px",
    boxSizing: "border-box"
  }
}))
export default class Routers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { styles } = this.props;
    const { location } = this.props;

    return (
      <div {...css(styles.view)}>
        {/* Nav */}
        <div {...css(styles.toparea)}>
          <Navigation />
        </div>
        {/* Component */}
        <div {...css(styles.bottomarea)}>
          <Switch location={location}>
            <Route
              key={location.key}
              location={location}
              component={Index}
              exact
              path="/"
            />
            <Route
              key={location.key}
              location={location}
              component={ExamplePage}
              path="/examplepage"
            />
            <Route
              key={location.key}
              location={location}
              component={About}
              path="/about"
            />
            <Route
              key={location.key}
              location={location}
              component={NoMatch}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
