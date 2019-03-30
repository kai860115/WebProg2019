import React, { Component } from 'react';

class TodoInput extends Component {
  handleInput = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.props.addItem(e.target.value);
      e.target.value = '';
    }
  }


  render() {
    return (
      <input type="text" className="todo-app__input" id='todo-input' placeholder="What needs to be done?" onKeyUp={this.handleInput} />
    );
  }
}

export default TodoInput;