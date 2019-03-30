import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class TodoMain extends Component {
  renderItems = () => {
    let items = this.props.todoItems;
    if (this.props.filter === 'Active') {
      items = items.filter(e => !e.completed);
    }
    else if (this.props.filter === 'Completed') {
      items = items.filter(e => e.completed);
    }
    return items.map((e, idx) => {
      let state = '';
      if (e.completed) {
        state = 'completed';
      }
      return <TodoItem key={e.id} id={e.id} detail={e.detail} state={state} removeItem={() => this.props.removeItem(idx)} setCompleted={() => this.props.setCompleted(idx)} />
    });
  }

  render() {
    return (
      <section className="todo-app__main">
        <TodoInput addItem={this.props.addItem} />
        <ul className="todo-app__list" id="todo-list">
          {this.renderItems()}
        </ul>
      </section>
    );
  }
}

export default TodoMain;