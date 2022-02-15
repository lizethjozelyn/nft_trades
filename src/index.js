import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header' /*this was for testing purposes*/
import { BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

/*
function Square(props) {

    return (
      <button className="square" onClick={  props.onClick} >
        {props.value}
      </button>
    );
  
}

class Board extends React.Component {


  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={ () => this.props.onClick(i)}/>;
  }

  render() {

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      center: null,
      moveState: false,
      selectedSpot: null,
      xIsNext: true,
    }
  }
   
  isLegal(src, dest) {
    const rowS = Math.floor(src/3);
    const colS = src%3;
    const rowD = Math.floor(dest/3);
    const colD = dest%3;

    if (Math.abs(rowS-rowD)<=1 && Math.abs(colS-colD)<=1) {
        console.log("legal");
        return(true);
    } else {
      return(false);
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();

    if (this.state.stepNumber>=6) {
      if (calculateWinner(squares) ) {
        return;
      }
      /*check for center piece by looking at history
      if (!this.state.moveState) {
		console.log(history[history.length-1].squares[4]);
		if (current.squares[4]==(this.state.xIsNext ? 'X' : 'O')) {
			console.log("must move");
			this.state.selectedSpot=4;
			this.state.moveState=true;	
			return;
		}		  
        console.log(squares[i]);
        console.log(this.state.xIsNext ? 'X' : 'O');
        if ((squares[i]==(this.state.xIsNext ? 'O' : 'X'))||squares[i]==null) {
          console.log('s');
          return;
        }
        this.state.selectedSpot=i;
        this.state.moveState=true;
        console.log(this.state.selectedSpot);
      } else {
        
        if (squares[i]!=null || this.isLegal(this.state.selectedSpot, i)==false) { return; }
        console.log("move here:" +i);
        squares[this.state.selectedSpot]=null;
        squares[i]=this.state.xIsNext ? 'X' : 'O';
        this.state.moveState=false;
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });        
      }
      return;
    }
    if (calculateWinner(squares) || squares[i]) {
      return;
    }


    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      moveState: false,
      stepNumber: step,
      xIsNext: (step%2) ===0,
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
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
      );
    });
    
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)} >
            </Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
*/