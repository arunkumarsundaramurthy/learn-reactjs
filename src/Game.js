import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.splice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].squares;
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ history: history.concat({ squares: newSquares }),
                        stepNumber: this.state.stepNumber + 1,
                        xIsNext: !this.state.xIsNext
        });
    }

    handleStep(step) {
        this.setState({stepNumber: step, xIsNext: (step % 2) === 0});
    }

    renderSteps() {
        return this.state.history.map((state, step) => {
                const desc = step ? `Go to move #${step}` : 'Go to game start';
                return (
                    <li key={step}>
                        <button onClick={() => this.handleStep(step)}>{desc}</button>
                    </li>
                );
            });
    }

    render() {
        const squares = this.state.history[this.state.stepNumber].squares;
        const winner = calculateWinner(squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
 
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.renderSteps()}</ol>
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

export default Game;