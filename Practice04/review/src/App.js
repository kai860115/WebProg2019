import React, { Component } from 'react';
import Todos from './containers/Todos';

class todo {
  constructor(id, name, checked) {
    this.id = id;
    this.name = name;
    this.checked = checked;
  }
}

class App extends Component {
  state = {
    items: [],
    mode: 'all'
  }

  inputFun = e => {
    let items = this.state.items;
    if (e.key === 'Enter') {
      let id = 0;
      if (items.length > 0) {
        id = items[items.length - 1].id + 1 ;
      }
      let item = new todo(id, e.target.value, false);
      items.push(item);
      this.setState({items: items});
      e.target.value = '';
    }   
  }

  deleteMe = e => {
    let id = parseInt(e.target.id);
    let items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
          items.splice(i, 1);
      }
    }
    this.setState({items: items});
  }

  btnAll = () => {
    this.setState({mode: 'all'});
  }

  btnActive = () => {
    this.setState({mode: 'active'});
  }

  btnCompleted = () => {
    this.setState({mode: 'completed'});
  }

  btnClear = () => {
    let temp = [];
    this.state.items.forEach(item => {
      if (item.checked === false) {
        temp.push(item);
      }
    });
    this.setState({items: temp});
  }

  shItems = mode => {
    if (mode === 'all') {
      return this.state.items;
    } else if (mode === 'active') {
      let temp = [];
      this.state.items.forEach(item => {
        if (item.checked === false) {
          temp.push(item);
        }
      });
      return temp;
    } else if (mode === 'completed') {
      let temp = [];
      this.state.items.forEach(item => {
        if (item.checked === true) {
          temp.push(item);
        }
      });
      return temp;
    }
  }

  leftNum = () => {
    let num = 0;
    this.state.items.forEach(item => {
      if (item.checked === false) {
        num += 1;
      }
    });
    return num
  }

  todoSty = (tf) => {
    if (tf) {
      return {textDecoration: 'line-through', color: 'rgb(198, 198, 198)'};
    } else {
      return {};
    }
  }

  labelSty = (tf) => {
    if (tf) {
      return {background: '#26ca299b'};
    } else {
      return {};
    }
  }

  clickMe = (e) => {
    console.log(e.target);
    let id = parseInt(e.target.id);
    let tem = [];
    this.state.items.forEach(item => {
      if (item.id === id) {
        console.log('he');
        item.checked = ! item.checked;
      }
      tem.push(item);
    });
    this.setState({items: tem});
  }

  render() {
    console.log(this.state);
    return (
      <div className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <section className="todo-app__main">
          <input type="text" className="todo-app__input" id="myInput" placeholder="What needs to be done?" onKeyPress={this.inputFun}/>
          <ul className="todo-app__list" id="todos">
            <Todos items={this.shItems(this.state.mode)} todoSty={this.todoSty} labelSty={this.labelSty} clickMe={this.clickMe} deleteMe={this.deleteMe}/>
          </ul>
        </section>
        <footer className="todo-app__footer" id="todo-footer" display="true">
          <div className="todo-app__total" id="leftNum">{this.leftNum()} left</div>
          <ul className="todo-app__view-buttons">
            <li><button id="btn-all" onClick={this.btnAll}>All</button></li>
            <li><button id="btn-active" onClick={this.btnActive}>Active</button></li>
            <li><button id="btn-completed" onClick={this.btnCompleted}>Completed</button></li>
          </ul>
          <div className="todo-app__clean">
            <button id="btn-clear" display='true' onClick={this.btnClear}>Clear completed</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
