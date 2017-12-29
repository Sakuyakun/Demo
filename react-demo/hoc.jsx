import React, { Component } from 'react';
import { render } from 'react-dom';

function HOC(WrappedComponent){
  return class extends WrappedComponent {
    componentWillMount(){
      this.setState(prevState => ({
        num: prevState.num + 1
      }))
    }
    render(){
      // super 作为对象在普通方法中，指向父类的原型对象。在静态方法中，指向父类
      return super.render();
    }
  }
}

@HOC
class OriginComponent extends Component {
  constructor(props){
    super(props)
    this.state = { 
      num: 1,
      content: 'origin component content '
    }
  }
  render(){
    const {content, num} = this.state
    return (
      <div>
        {content + num}
      </div>
    )
  }
}

render(<OriginComponent />, document.getElementById('root'));
