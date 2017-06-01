// CommentList.js
import React, { Component } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }
  handleDeleteComment (index) {
    this.props.onDeleteComment(index)
  }
  render() {
    return (
      <div>
        {
          this.props.comments.map((comment, i) => {
            return <Comment comment={comment} key={i} index={i} onDeleteComment={this.handleDeleteComment.bind(this)}/>
          })
        }
      </div>
    );
  }
}

CommentList.propTypes = {
  comment: PropTypes.object,
  onDeleteComment: PropTypes.func.isRequired
}

export default CommentList;
