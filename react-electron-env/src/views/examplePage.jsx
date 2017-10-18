import React, { Component } from "react";
import pureRender from "../utils/immutable-pure-render-decorator";
import { css, withStyles } from "../withStyles";
import Comp from "../component/comp";

@pureRender
@withStyles(({ color }) => ({
  compContent: {
    color: color.text
  }
}))
export default class ExamplePage extends Component {
  state = {
    info: [
      "component 1 content in yorha",
      "component 2 content in yorha",
      "component 3 content in yorha",
      "component 4 content in yorha",
      "component 5 content in yorha"
    ]
  };
  render() {
    const { info } = this.state;
    const { styles } = this.props;

    return (
      <div>
        <div {...css(styles.compContent)}>
          {info.map((item, index) => <Comp key={index} content={item} />)}
        </div>
      </div>
    );
  }
}
