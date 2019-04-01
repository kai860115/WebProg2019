import React, { Component } from 'react';

class Todos extends Component {

  render() {
    return (
      this.props.items.map(item => (
        <li className="todo-app__item">
          <div className="todo-app__checkbox">
            <input type="checkbox" checked={item.checked}/>
            <label id={item.id} style={this.props.labelSty(item.checked)} onClick={this.props.clickMe}></label>
          </div>
          <h1 className="todo-app__item-detail" style={this.props.todoSty(item.checked)}>{item.name}</h1>
          <img src="./img/x.png" className="todo-app__item-x"  id={item.id} onClick={this.props.deleteMe}/>
        </li>
      ))
    );
  }
}

export default Todos;
