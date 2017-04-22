import React from 'react';
import style from '../styles/auto-complete.less'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      displayValue: '',
      activeItemIndex: -1
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.getItemValue = this.getItemValue.bind(this)
  }
  handleChange (value) {
    this.setState({
      displayValue: '',
      activeItemIndex: -1
    });
    this.props.onValueChange(value);
  }
  getItemValue (item) {
    return item.value || item;
  }
  handleKeyDown (e) {
    const {activeItemIndex} = this.state;
    const {options} = this.props;

    switch (e.keyCode) {
      // 13为回车键
      case 13 : {
        if (activeItemIndex >= 0) {
          // 存在选中项
          e.preventDefault();
          e.stopPropagation();
          this.onValueChange(this.getItemValue(options[activeItemIndex]))
        }
        break;
      }
      // 38为上方向键，40为下方向键
      case 38:
      case 40: {
        e.preventDefault();
        this.moveItem(e.keyCode === 38 ? 'up' : 'down');
      }
    }
  }
  // 使用moveItem方法对选中项更新或取消
  moveItem (direction) {
    const {activeItemIndex} = this.state;
    const {options} = this.props;
    let lastIndex = options.length - 1;
    let newIndex = -1;

    if (direction === 'up') {
      if (activeItemIndex === 0 || activeItemIndex === -1) {
        newIndex = lastIndex;
      } else {
        newIndex = activeItemIndex - 1;
      }
    } else {
      if (activeItemIndex === lastIndex) {
        newIndex = 0;
      } else {
        newIndex = activeItemIndex + 1;
      }
    }

    let newDisplayValue = ''
    if (newIndex >= 0) {
      newDisplayValue = this.getItemValue(options[newIndex])
    }

    this.setState({
      displayValue: newDisplayValue,
      activeItemIndex: newIndex
    })
  }
  handleEnter (index) {
    const currentItem = this.props.options[index]
    this.setState({
      displayValue: this.getItemValue(currentItem),
      activeItemIndex: index
    })
  }
  handleLeave () {
    this.setState({
      displayValue: '',
      activeItemIndex: -1
    })
  }
  render() {
    const {displayValue, activeItemIndex} = this.state;
    const {value, options} = this.props;

    return (
      <div className={style.wrapper}>
        <input
          value={displayValue || value}
          onChange={e => this.handleChange(e.target.value)}
          onKeyDown={this.handleKeyDown}
        />
        {
          options.length > 0 && (
          <ul className={style.options} onMouseLeave={() => this.handleLeave()}>
            {
              options.map((item, index) => {
                return (
                  <li 
                    key={index} 
                    className={activeItemIndex === index ? style.active : ''}
                    onClick={e => this.handleChange(this.getItemValue(item))}
                    onMouseEnter={() => this.handleEnter(index)}
                  >
                    {item.text || item}
                  </li>
                );
              })
            }
          </ul>)
        }
      </div>
    );
  }
}

export default AutoComplete;