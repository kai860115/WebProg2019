import React, { Component } from 'react';

class ViewButton extends Component {
  handleClick = () => {
    this.props.changeView(this.props.text)
  }
  render() {
    return (
      <li><button id={this.props.id} className={this.props.className}>{this.props.text}</button></li>
    );
  }
}

export default ViewButton;