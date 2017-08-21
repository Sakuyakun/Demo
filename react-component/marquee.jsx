import React, {Component} from 'react'

/**
* 跑马灯控件
*/
export default class yorhaMarquee extends Component {
    static defaultProps = {
      text: '',
      hoverToStop: true,
      loop: true,           //是否循环滚动
      leading: 1000,        //开始滚动的时间
      trailing: 1000,       //本次滚动完暂停时间
      STEP: 1,              //每次滚动的像素
      TIMEOUT: 1 / 20 * 1000, //滚动的间隔
    }
    constructor(props) {
        super(props);
        this.state = {
            animatedWidth: 0,
            overflowWidth: 0,
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.measureText = this.measureText.bind(this);
    }

    componentDidMount() {
        this.measureText();

        if (this.props.hoverToStop) {
            this.startAnimation();
        }
    }

    componentDidUpdate() {
        this.measureText();
    }

    componentWillUnmount() {
        clearTimeout(this.marqueeTimer);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.text.length !== nextProps.text.length) {
            clearTimeout(this.marqueeTimer);
            this.setState({animatedWidth: 0});
        }
    }

    handleMouseEnter() {
        if (this.props.hoverToStop) {
            clearTimeout(this.marqueeTimer);
        } else if (this.state.overflowWidth > 0){
            this.startAnimation();
        }
    }

    handleMouseLeave() {
        if (this.props.hoverToStop && this.state.overflowWidth > 0) {
            this.startAnimation();
        } else {
            clearTimeout(this.marqueeTimer);
            this.setState({animatedWidth: 0});
        }
    }

    /**
    * 开启左右滚动动画
    */
    startAnimation() {
        clearTimeout(this.marqueeTimer);
        const isLeading = this.state.animatedWidth === 0;
        const {TIMEOUT, STEP} = this.props;
        const timeout = isLeading ? this.props.leading : TIMEOUT;

        const animateLeft = () => {
            const overflowWidth = this.state.overflowWidth;
            let animatedWidth = this.state.animatedWidth + STEP;
            const isRoundOver = animatedWidth > overflowWidth;
            
            if (isRoundOver) {
            	animatedWidth = overflowWidth;
            }

            if (isRoundOver && this.props.trailing) {
                this.marqueeTimer = setTimeout(() => {
                    this.setState({animatedWidth: animatedWidth});
                    this.marqueeTimer = setTimeout(animateRight, TIMEOUT);
                }, this.props.trailing);
            } else {
                this.setState({animatedWidth: animatedWidth});
                this.marqueeTimer = setTimeout(animateLeft, TIMEOUT);
            }
        }

        const animateRight = () => {
            const overflowWidth = this.state.overflowWidth;
            let animatedWidth = this.state.animatedWidth - STEP;
            const isRoundOver = animatedWidth < 0;
            
            if (isRoundOver) {
            	animatedWidth = 0;
            }

            if (isRoundOver && this.props.trailing) {
                this.marqueeTimer = setTimeout(() => {
                    this.setState({animatedWidth: animatedWidth});
                    this.marqueeTimer = setTimeout(animateLeft, TIMEOUT);
                }, this.props.trailing);
            } else {
                this.setState({animatedWidth: animatedWidth});
                this.marqueeTimer = setTimeout(animateRight, TIMEOUT);
            }
        }

        this.marqueeTimer = setTimeout(animateLeft, timeout);
    }

    /**
    * 计算内容超过容器的宽度
    */
    measureText() {
        const container = this.refs.container;
        const node = this.refs.text;
        if (container && node) {
            const containerWidth = container.offsetWidth;
            const textWidth = node.offsetWidth;
            const overflowWidth = textWidth - containerWidth;
            if (overflowWidth != this.state.overflowWidth && overflowWidth > 0) {
                this.setState({overflowWidth: overflowWidth});
            }
        }
    }

    render() {
        const style = {
            position: 'relative',
            right: this.state.animatedWidth,
            whiteSpace: 'nowrap',
        }
        if (this.state.overflowWidth > 0) {
            return (
              <div ref="container"
                  className={this.props.className}
                  style={{overflow: 'hidden'}}>
                  <span ref="text" style={style} title={this.props.text}>
                      {this.props.text}
                  </span>
              </div>
            )
        }

        return (
          <div ref="container"
              className={this.props.className}
              style={{overflow: 'hidden'}}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave} >
              <span ref="text" style={style} title={this.props.text}>
                  {this.props.text}
              </span>
          </div>
        )
	  }
}

// yorhaMarquee.propTypes = {
//     text: PropTypes.string,
//     hoverToStop: PropTypes.bool,
//     loop: PropTypes.bool,
//     leading: PropTypes.number,
//     trailing: PropTypes.number,
//     className: PropTypes.string
// }