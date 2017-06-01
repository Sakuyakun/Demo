import React from "react";
import PropTypes from "prop-types";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeString: ""
    };
  }
  _updateTimeString() {
    const comment = this.props.comment;
    const duration = (Date.now() - comment.createTime) / 1000;
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))} 秒前`
    });
  }
  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }
  _getProcessedContent (content) {
    return content.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(this._updateTimeString.bind(this), 1000);
  }
  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username} </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(this.props.comment.content)
        }} />
        <span className="comment-createdtime">
          {this.state.timeString}
        </span>
        <span
          className="comment-delete"
          onClick={this.handleDeleteComment.bind(this)}
        >
          删除
        </span>
      </div>
    );
  }
  componentWillUnmount () {
    clearInterval(this._timer)
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default Comment;
