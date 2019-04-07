import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 0,
      buf: '0',
      operator: '',
      input: '',
      eq: false,
      fkeq: ''
    };
  }

  resetState = () => {
    this.setState({
      base: 0,
      buf: '0',
      operator: '',
      input: '',
      eq: false,
      fkeq: ''
    });
    console.log('reset');
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  handleInput = (input) => {
    if (!isNaN(parseInt(input))) {
      this.setState((state) => {
        if (!state.eq) {
          if (state.input === '0' || state.input === '') {
            return {buf: input, input: input};
          } else {
            const newNum = state.input + input
            return {buf: newNum, input: newNum};
          }
        } else {
          if (state.fkeq === '0' || state.fkeq === '') {
            return {buf: input, fkeq: input};
          } else {
            const newNum = state.fkeq + input
            return {buf: newNum, fkeq: newNum};
          }
        }
      });
    } else { // + - x /
      this.setState((state) => {
        if (state.eq && input !== '=')
          return {operator: '', input: '', eq: false};
      });
      this.setState((state) => {
        if (state.operator === '') {
          if (input === '=') return {base: state.input===''?state.base:parseInt(state.input), input: ''};
          else return {base: state.input===''?state.base:parseInt(state.input), operator: input, input: ''};
        } else {
          if (state.input === '') {
            if (input === '=') return {operator: '', input: ''};
            else return {operator: input, input: ''};
          } else {
            let newBase = state.eq? parseInt(state.buf): state.base;
            const inputNum = parseInt(state.input);
            switch (state.operator) {
              case '+': newBase += inputNum; break;
              case '-': newBase -= inputNum; break;
              case 'x': newBase *= inputNum; break;
              case '÷': newBase /= inputNum; break;
              default: break;
            }
            if (input === '=') return {base: newBase, buf: newBase};
            else return {base: newBase, buf: newBase, operator: input, input: ''};
          }
        }
      });
      this.setState({fkeq: ''});
      if (input === '=')
        this.setState({eq: true});
    }
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.buf}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleInput} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleInput} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleInput} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.handleInput} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton onClick={this.handleInput} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
