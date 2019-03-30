import React, { Component } from 'react';

class TodoItemCheckbox extends Component {
  render() {
    return (
      <div className="todo-app__checkbox" >
        <input type="checkbox" name="" id={this.props.id} onChange={this.props.onChange} checked={this.props.checked} />
        <label htmlFor={this.props.id}></label>
      </div>
    );
  }
}

export default TodoItemCheckbox;