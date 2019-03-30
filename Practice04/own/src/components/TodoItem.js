import React, { Component } from 'react';
import TodoItemCheckbox from './TodoItemCheckbox';
import TodoItemDetail from './TodoItemDetail';
import x from './x.png';

class TodoItem extends Component {
  render() {
    return (
      <li className={"todo-app__item " + this.props.state}>
        <TodoItemCheckbox id={this.props.id} onChange={this.props.setCompleted} checked={this.props.state} />
        <TodoItemDetail text={this.props.detail} />
        <img src={x} className="todo-app__item-x" alt='' onClick={this.props.removeItem} />
      </li>
    );
  }
}

export default TodoItem;