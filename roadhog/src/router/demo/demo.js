import React from 'react';

class ListOfWords extends React.PureComponent {
  render(){
    return <div>{this.props.words.join(',')}</div>
  }
}

class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      words: ['marklar']
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState(prevState => {
      words: [...prevState.words, 'marklar']
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick} >Click Me</button>
        <ListOfWords words={this.state.words}/>
      </div>
    )
  }
}

export default Demo;