import React, { Component } from 'react';

class Total extends Component {
  render() {
    return (
      <div className="todo-app__total">
        <p id='todo-total'>{this.props.count} left</p>
      </div>
    );
  }
}

export default Total;