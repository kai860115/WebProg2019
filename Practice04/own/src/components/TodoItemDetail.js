import React, { Component } from 'react';

class TodoItemDetail extends Component {
  render() {
    return (
      <p className="todo-app__item-detail">{this.props.text}</p>
    );
  }
}

export default TodoItemDetail;