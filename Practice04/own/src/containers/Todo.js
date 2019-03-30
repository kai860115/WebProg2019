import React, { Component } from 'react';
import Total from '../components/Total';
import ViewOptions from "../components/ViewOptions";
import TodoHeader from "../components/TodoHeader";
import Clear from "../components/Clear";
import TodoMain from "../components/TodoMain";

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todoItems: [],
			id: 0,
			view: 'All',
			count: 0,
			hideClear: 'hide',
			hideFooter: 'hide'
		};
	}

	removeItem = (id) => {
		this.setState((state) => {
			let newTodoItems = state.todoItems;
			newTodoItems.splice(id, 1);
			return {
				todoItems: newTodoItems,
				count: newTodoItems.filter(e => !e.completed).length,
				hideClear: newTodoItems.filter(e => e.completed).length ? '' : 'hide',
				hideFooter: newTodoItems.length ? '' : 'hide'
			};
		});
	}

	addItem = (detail) => {
		this.setState((state) => {
			let newTodoItems = state.todoItems;
			newTodoItems.push({ detail: detail, completed: false, id: state.id });
			return {
				todoItems: newTodoItems, id: state.id + 1,
				count: newTodoItems.filter(e => !e.completed).length,
				hideClear: newTodoItems.filter(e => e.completed).length ? '' : 'hide',
				hideFooter: newTodoItems.length ? '' : 'hide'
			};
		});
	}

	setCompleted = (id) => {
		this.setState((state) => {
			let newTodoItems = state.todoItems;
			newTodoItems[id].completed = !newTodoItems[id].completed;
			return {
				todoItems: newTodoItems,
				count: newTodoItems.filter(e => !e.completed).length,
				hideClear: newTodoItems.filter(e => e.completed).length ? '' : 'hide'
			};
		});
	}

	clearCompleted = () => {
		this.setState((state) => {
			let newTodoItems = state.todoItems.filter(e => !e.completed);
			return {
				todoItems: newTodoItems,
				hideClear: newTodoItems.filter(e => e.completed).length ? '' : 'hide',
				hideFooter: newTodoItems.length ? '' : 'hide'
			};
		})
	}

	changeView = (value) => {
		this.setState(() => {
			return {
				view: value
			}
		});
	}

	render() {
		return (
			<div id='root' className="todo-app__root">
				<TodoHeader />
				<TodoMain todoItems={this.state.todoItems} removeItem={this.removeItem} addItem={this.addItem} setCompleted={this.setCompleted} filter={this.state.view} />
				<footer className={"todo-app__footer " + this.state.hideFooter} id='todo-footer' >
					<Total count={this.state.count} />
					<ViewOptions view={this.state.view} onChange={this.changeView} />
					<Clear hide={this.state.hideClear} clearCompleted={this.clearCompleted} />
				</footer>
			</div>
		);
	}
}

export default Todo;