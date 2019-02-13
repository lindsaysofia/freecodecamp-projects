function Square(props) {
  return (
    <button className={props.winner ? 'square-winner' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
         winner={winnerArray.includes(i)}
         value={this.props.squares[i]}
         onClick={() => this.props.onClick(i)}
         key={i}
       />
     );
  }

  render() {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
      let start = 3 * i
      for (let j = start; j < start + 3; j++) {
        squares.push(this.renderSquare(j));
      }
      board.push( <div className="board-row" key={'boardRow' + i}>{squares}</div>);
    }
    return (
      <div>
        <div className="status">{status}</div>
        {board}
      </div>
    );
  }
}



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        column: null,
        row: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      toggle: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        column: getCol(i),
        row: getRow(i),
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, 
    });
  }
  
  jumpTo(step) {
    winnerArray = [];
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  handleToggle() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ? 
            'Go to move #' + move :
            'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{step === current ? <strong>{desc}</strong> : desc}</button>
          <p>Column: {step.column} Row: {step.row} </p>
        </li>
      );
    });
    
    if (this.state.toggle) {
      moves.reverse();
    }
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = 'This game resulted in a draw!'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="toggle">
          <button onClick={this.handleToggle}>Toggle Moves</button>
        </div>
      </div>
    );
  }
}

let winnerArray = [];

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winnerArray = lines[i];
      return squares[a];
    }
  }
  return null;
}

function getCol(i) {
  switch(i) {
    case 0:
    case 3:
    case 6:
      return 0;
      break;
    case 1:
    case 4:
    case 7:
      return 1;
      break;
    case 2:
    case 5:
    case 8:
      return 2;
      break;
  }
}

function getRow(i) {
  switch(i) {
    case 0:
    case 1:
    case 2:
      return 0;
      break;
    case 3:
    case 4:
    case 5:
      return 1;
      break;
    case 6:
    case 7:
    case 8:
      return 2;
      break;
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
