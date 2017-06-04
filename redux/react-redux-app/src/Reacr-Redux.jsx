import React, { Component, PropTypes } from 'react'

// Provider容器组件 单单为了将外界传入的props.store存放到context，然后把props.children原封不动渲染出来，props.children一般是根组件。
// 由于使用到react-redux的组件都经过高阶组件处理成包装组件，所以包装组件中可进行this.context获取到store对象从而进行操作
export class Provider extends Component {
  static PropTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

// 高阶组件connect 
export const connect = (mapStateToProps, mapDispatchProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor (props) {
      super(props)
      this.state = {
        allProps: {} //保存需要传给被包装组件的所有参数
      }
    }
    
    componentWillMount() {
      // 负责state初始化 添加监听事件，当数据变化后调用_updateState()
      const { store } = this.context
      this._updateState()
      store.subscribe(() => this._updateState())
    }
    _updateState() {
      const {store} = this.context
      // mapStateToProps与mapDispatchProps参数可缺省
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
      let dispatchProps = mapDispatchProps  ? mapDispatchProps(store.dispatch, this.props): {}
      this.setState({
        // mapStateToProps 可以根据store里面的state(stateProps)和外界传入的props(this.props)生成想传给被包装组件的参数
        // mapDispatchProps 提供store里面的dispatch方法传给被包装组件，就可在包装函数中调用dispatch
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props 
        }
      })
    }

    render () {
      return <WrappedComponent {...this.state.allProps} />
    }
  }

  return Connect
}

