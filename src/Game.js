import React from 'react';
import { Prompt } from 'react-router-dom';
import './index.css';

function Square(props) {
      let sqClass = "square";
      if (props.winner === true) {
          sqClass = sqClass + " text-success";
      }

      return (
        <button className={sqClass} disabled={props.gamePaused} onClick={props.onClick} >
            
          { props.value }
        </button>
      );
  }

  function ErrorMessage(props) {
    
    return (
    <div>
        { props.errorMessage && 
            <div className="alert alert-danger alert-dismissible text-sm">
                <button type="button" className="close pt-1" onClick={() => props.clearErrorMessage() } data-dismiss="alert">&times;</button>
                <span class="fa fa-times-circle"></span>&nbsp;{ props.errorMessage  }
            </div> }
    </div>
      );
  }
  
  class Board extends React.Component {


    renderSquare(i) {
        let winner = false;
        if (this.props.winningLine.length > 0) {
            if (this.props.winningLine[0] === i ||
                this.props.winningLine[1] === i ||
                this.props.winningLine[2] === i) {
                    winner = true;
                }
        }

      return <Square key={i}
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                gamePaused={this.props.gamePaused}
                winner={winner} />;
    }

    getCols(row) {
        let colSet = [];
        for (let col = 0; col < 3; col++) {
            colSet.push(this.renderSquare(row * 3 + col));
        }

        return colSet;
    }

    getRow(row) {
        return <div key={row} className="board-row">
            { this.getCols(row) }
        </div>
    }


    render() {

        let squareSet =[]; 
        for (let row = 0; row < 3; row++)
        {
            squareSet.push(this.getRow(row));
        }    

 
      return (
          <div>
            <div>
                {squareSet}
            </div>
        </div>
      );
    }
  }
  
  export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            xIsNext: true,
            history: [ { squares: Array(9).fill(null) } ],
            stepNumber: 0,
            gameOver: false,
            sortMovesDesc: false,
            winningLine: []
        }
    }

    setErrorMessage(message) {
        this.setState({
            errorMessage: message
        });
    }

    clearBoard() {
        this.setState({
            errorMessage: null,
            xIsNext: true,
            history: [ { squares: Array(9).fill(null) } ],
            winner: null,
            stepNumber: 0,
            gameOver: false,
            winningLine: []
        });

        this.setErrorMessage(null);
    }

    isReplaying() {
        if (this.state.history.length - 1 > this.state.stepNumber)
            return true;
        else 
            return false;
    }

    isGameOver(squares) {
        let gameOver = true;
        if (squares.length > 0) {
                squares.map((val, idx) =>  {
                if (val == null) {
                    gameOver = false;
                    return false;
                } else {
                    return true;
                }
            });
        }
        this.setState({ gameOver: gameOver});
        return gameOver;
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i] == null && this.state.winner == null) {
            squares[i] = this.state.xIsNext ? "X" : "O";

           // this.props.addHistoryItem(squares);
            this.setState({
                history: history.concat([{
                    squares: squares
                }]), 
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length
            });    
            const winner = calculateWinner(squares);
            this.isGameOver(squares);


            if (winner) {
              this.setState(
                  { winner: this.state.xIsNext ? "X" : "O",
                    gameOver: true,
                    winningLine: calculateWinner(squares).line }
                  );
            } 

            this.setErrorMessage(null);
            
    
        } else {
            if (this.state.winner != null) {
                this.setErrorMessage("Sorry the game is over.");
            } else {
                this.setErrorMessage("Sorry that cell is occupied.");
            }
            
        }
    }

    getStatusClass(winner) {
        if (winner != null) {
            return "status alert-success bold-it";
        } else {
            return "status";
        }
    }

    addHistoryItem(squares) {
        const history  = this.state.history.slice();
        history.push(squares);
        this.setState({ history: history });
        
    }

    replayIt() {
        this.setState({ stepNumber: 0});
        var self = this;
        var intTimer = setInterval(function() {
           
            if (self.state.stepNumber < self.state.history.length -1) {
                
                self.setState({stepNumber: self.state.stepNumber+1});    
            } else {
                clearInterval(intTimer);
            }
        }, 1500)
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

      computeRow(index) {
          return (Math.floor(index / 3)) + 1;
      }

      computeCol(index) {
          return (index % 3 ) + 1;
      }

      getSortClass() {
          if (this.state.sortMovesDesc) {
              return "fa fa-arrow-up"
          } else {
            return "fa fa-arrow-down"
          }
      }

      computeMoveLocation(move, step) {

        let priorMove = null;
        if (move > 0) {
            priorMove = this.state.history[move - 1];
        } else {
            priorMove =  Array(9).fill(null);
        }
   

        let lastMove = "Unknown Move";
        step.squares.map((val, idx) => {
            if (val != null && priorMove.squares[idx] == null) {
                lastMove =  `${val} at (${this.computeRow(idx)},${this.computeCol(idx)})`;
            } 
            return lastMove;
        });
    
        
         return lastMove;
        
       }
   

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);
       
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move + " (" + this.computeMoveLocation(move, step) + ")" :
              'Go to game start';
            return (
              <li key={move} className={this.state.stepNumber === move ? 'bold-it' : '' }>
                <button onClick={() => this.jumpTo(move)} className={this.state.stepNumber === move ? 'bold-it' : '' }>{desc}</button>
              </li>
            );
          });

          if (this.state.sortMovesDesc) {
            moves.sort((a,b) => { if (a.key > b.key) { return -1; } else {return 1; }});
          } else {
            moves.sort((a,b) => { if (a.key < b.key) { return -1; } else {return 1; }});
          }
        
        
        let status;
        if (winner != null) {
            status = 'Winner: ' + winner.winner;
        } else {
            status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
        }
      return (
        <div className="container">
            <h2>Tic Tac Toe</h2>
            <p>Greetings Professor Falken, shall we play a game?</p>
            <Prompt
                when={this.state.history.length > 1 && !this.state.gameOver }
                message="You are in the middle of a game, are you sure you want to leave?">

            </Prompt>
            { this.state.gameOver ? <div>Game Over</div> : <div>&nbsp;</div> }
            <div className="game">
                <div className="game-board">
                    <Board  
                        setErrorMessage={(message) => this.setErrorMessage(message)} 
                        addHistoryItem={(squares) => this.addHistoryItem(squares) }
                        onClick={(i) => this.handleClick(i) }
                        squares={current.squares}
                        gamePaused={this.state.history.length - 1 > this.state.stepNumber}
                        winningLine={this.state.winningLine} 
                    />
                </div>
                <div className="game-info">
                    <div className={ this.getStatusClass(winner) }>{ status } 
                        <button className="ml-2 btn btn-sm btn-primary" onClick={() => {this.setState({ sortMovesDesc: !this.state.sortMovesDesc})}}>
                            Sort <span className={this.getSortClass()}></span>
                        </button></div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
            <div>
                    <button className="btn btn-sm btn-primary mt-2" onClick={() => { this.clearBoard(); }} disabled={ this.isReplaying() }>Clear Board</button>
                    <button className="btn btn-sm btn-success ml-3 mt-2" onClick={() => { this.replayIt(); }} disabled={ this.state.winner == null && this.state.gameOver===false}>Replay</button>
            </div>
            <div className="mt-2">
                <ErrorMessage errorMessage={this.state.errorMessage} clearErrorMessage={() => this.setErrorMessage(null)}></ErrorMessage>
            </div>
        </div>

      );
    }
  }
  
  // ========================================
  /*
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  ); */
  
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
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }