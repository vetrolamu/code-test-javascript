import React from 'react';

import Scoreboard from '../scoreboard/scoreboard.jsx';

import { getMaxScore, isScoreValid, getCurrentFrame } from './game.functions';

import './game.scss';

const GAME_CONFIG = {
    frames: 10,
    pins: 10
};

const Game = React.createClass({
    getInitialState() {
        return {
            error: null,
            currentScore: '',
            currentFrame: {index: 0, rollIndex: 0, score: null},
            rolls: []
        };
    },

    restartGame() {
        this.setState(this.getInitialState());
    },

    changeScore({target: {value}}) {
        this.setState({currentScore: value, error: null});
    },

    submitScore(e) {
        e.preventDefault();
        const {currentScore, currentFrame, rolls} = this.state;

        if (!isScoreValid(currentScore, currentFrame, GAME_CONFIG.pins)) {
            this.setState({error: 'Wrong value'});

            return;
        }

        const numericScore = Number(currentScore);

        this.setState({
            currentScore: '',
            currentFrame: getCurrentFrame(currentFrame, numericScore, GAME_CONFIG.pins, GAME_CONFIG.frames),
            rolls: [...rolls, numericScore]
        });
    },

    render() {
        const {currentFrame, currentScore, rolls, error} = this.state;

        return (
            <section className="game">
                <Scoreboard
                    currentFrameIndex={currentFrame && currentFrame.index}
                    framesNumber={GAME_CONFIG.frames}
                    pinsNumber={GAME_CONFIG.pins}
                    rolls={rolls} />
                <div className="game__controls">
                    {currentFrame
                        ? <form onSubmit={this.submitScore}>
                            <h4>Frame #{currentFrame.index + 1}</h4>
                            <input
                                className="game__score-input"
                                max={getMaxScore(currentFrame, GAME_CONFIG.pins)}
                                min="0"
                                onChange={this.changeScore}
                                placeholder="enter your score"
                                type="number"
                                value={currentScore} />
                            {error &&
                                <div className="game__error">{error}</div>
                            }
                        </form>
                        : <div>
                            <h4>Game Over</h4>
                            <button className="game__restart" onClick={this.restartGame}>
                                Start Again
                            </button>
                        </div>
                    }
                </div>
            </section>
        );
    }
});

export default Game;
