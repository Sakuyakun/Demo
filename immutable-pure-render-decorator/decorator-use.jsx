import React, { Component } from 'react'
import pureRender from "./immutable-pure-render-decorator"

@pureRender
class ChildComponent extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div></div>
		)
	}
}

export default ChildComponent