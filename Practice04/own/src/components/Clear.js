import React, { Component } from 'react';

class Clear extends Component {
  render() {
    return (
      <div className="todo-app__clean">
        <button id='todo-clean' className={this.props.hide} onClick={this.props.clearCompleted}>Clear completed</button>
      </div>
    );
  }
}

export default Clear;