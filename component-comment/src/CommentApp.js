import React, { Component } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }
  handleSubmitComment(newComment) {
    if (!newComment) return;
    if (!newComment.username) return alert("请输入用户名");
    if (!newComment.content) return alert("请输入评论内容");
    let comments = this.state.comments;
    comments.push(newComment);
    this.setState({
      comments
    });
    this._saveComments(comments);
  }
  _saveComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  _loadComments() {
    let comments = localStorage.getItem("comments");
    if (comments) {
      comments = JSON.parse(comments);
      this.setState({
        comments
      });
    }
  }
  handleDeleteComment (index) {
    let comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({
      comments
    })
    this._saveComments(comments);
  }
  componentWillMount() {
    this._loadComments();
  }
  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
      </div>
    );
  }
}

export default CommentApp;
