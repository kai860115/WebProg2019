import React, { Component } from 'react';

const viewOptions = {
  'all-button': 'All',
  'active-button': 'Active',
  'completed-button': 'Completed'
};

class ViewOptions extends Component {
  getViewButtonClass = (viewOption) => {
    if (viewOption === this.props.view) {
      return 'selected';
    }
    else {
      return '';
    }
  }

  renderViewOptions = () => {
    return Object.keys(viewOptions).map(viewOption => {
      let viewOptionValue = viewOptions[viewOption];
      return (
        <li key={viewOptionValue}>
          <button id={viewOption} className={this.getViewButtonClass(viewOptionValue)} onClick={() => this.handleChange(viewOptionValue)}>
            {viewOptionValue}
          </button>
        </li >
      )
    })
  }

  handleChange = (value) => {
    this.props.onChange(value);
  }

  render() {

    return (
      <ul className="todo-app__view-buttons">
        {this.renderViewOptions()}
      </ul>
    );
  }
}

export default ViewOptions;