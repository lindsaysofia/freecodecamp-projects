import React from 'react';
import './App.css';

const INPUT_REGEX = /[\d\.]*$/;
const ZERO_REGEX = /^0*(\d+)/;
const OPERATOR_REGEX = /[-\+\*\/]+$/;
const MINUS_COMPATIBLE_REGEX = /[\+\*\/]/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      equation: '0'
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleInput(event) {
    let clickedInput = event.target.innerText;
    let currentInput = this.state.equation.match(INPUT_REGEX)[0];
    let equation = this.state.equation;
    if (equation.includes('=')) {
      currentInput = (0 + clickedInput).replace(ZERO_REGEX, '$1');
      equation = currentInput;
    } else if (clickedInput !== '.' || (clickedInput === '.' && !currentInput.includes('.'))) {
      currentInput = (currentInput + clickedInput).replace(ZERO_REGEX, '$1');
      equation = equation.replace(INPUT_REGEX, currentInput);
    }
    this.setState({
      input: currentInput,
      equation
    });
  }

  handleOperator(event) {
    let equation = this.state.equation;
    let clickedOperator = event.target.innerText;
    let currentOperator = equation.match(OPERATOR_REGEX);
    if (equation.includes('=')) {
      equation = this.state.equation.match(INPUT_REGEX)[0] + clickedOperator;
    } else if (currentOperator === null) {
      equation = equation + clickedOperator;
    } else if (currentOperator[0].length === 2) {
      if (MINUS_COMPATIBLE_REGEX.test(clickedOperator)) {
        equation = equation.replace(OPERATOR_REGEX, clickedOperator);
      }
    } else if (clickedOperator === '-' && MINUS_COMPATIBLE_REGEX.test(currentOperator[0])) {
      equation = equation + clickedOperator;
    } else {
      equation = equation.replace(OPERATOR_REGEX, clickedOperator);
    }
    this.setState({
      input: clickedOperator,
      equation
    });
  }

  handleEquals() {
    let equation = this.state.equation.replace(/^[\D\.]+|[/D\.]+$/g, '');
    let result = eval(equation).toString();
    this.setState({
      input: result,
      equation: `${equation}=${result}`
    })
  }

  handleClear() {
    this.setState({
      input: '0',
      equation: '0'
    });
  }

  render() {
    return (
      <div className="calculator">
        <button id="equals" onClick={this.handleEquals}>=</button>
        <button id="zero" onClick={this.handleInput}>0</button>
        <button id="one" onClick={this.handleInput}>1</button>
        <button id="two" onClick={this.handleInput}>2</button>
        <button id="three" onClick={this.handleInput}>3</button>
        <button id="four" onClick={this.handleInput}>4</button>
        <button id="five" onClick={this.handleInput}>5</button>
        <button id="six" onClick={this.handleInput}>6</button>
        <button id="seven" onClick={this.handleInput}>7</button>
        <button id="eight" onClick={this.handleInput}>8</button>
        <button id="nine" onClick={this.handleInput}>9</button>
        <button id="add" onClick={this.handleOperator}>+</button>
        <button id="subtract" onClick={this.handleOperator}>-</button>
        <button id="multiply" onClick={this.handleOperator}>*</button>
        <button id="divide" onClick={this.handleOperator}>/</button>
        <button id="decimal" onClick={this.handleInput}>.</button>
        <button id="clear" onClick={this.handleClear}>AC</button>
    <p id="equation-display">equation: {this.state.equation}</p>
    <p id="display">{this.state.input}</p>
      </div>
    );
  }
}

export default App;
