import React, { Component } from 'react'
import { deepCompare } from "./immutable-pure-render-decorator"

class ChildComponent extends Component {
	constructor(props, context) {
		super(props, context);
	}
  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = () => {
      //some code...
    }
    return deepCompare(this, nextProps, nextState) && shouldUpdate
	}
	render() {
		return (
			<div></div>
		)
	}
}
export default ChildComponent
