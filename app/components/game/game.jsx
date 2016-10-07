import React from 'react';
import { connect } from 'react-redux';

import Scoreboard from '../scoreboard/scoreboard.jsx';
import * as gameActions from '../../redux/actions/game';

import './game.scss';

const Game = ({currentFrameIndex, currentScore, currentScoreError, dispatch, maxScore}) => {
    const restartGame = () =>
        dispatch(gameActions.restartGame());
    const changeScore = ({target: {value}}) =>
        dispatch(gameActions.changeScore(value));
    const submitScore = (e) => {
        e.preventDefault();
        dispatch(gameActions.submitScore());
    };

    return (
        <section className="game">
            <Scoreboard />
            <div className="game__controls">
                {currentFrameIndex !== null
                    ? <form onSubmit={submitScore}>
                        <h4>Frame #{currentFrameIndex + 1}</h4>
                        <input
                            className="game__score-input"
                            max={maxScore}
                            min="0"
                            onChange={changeScore}
                            placeholder="enter your score"
                            type="number"
                            value={currentScore} />
                        {currentScoreError &&
                            <div className="game__error">{currentScoreError}</div>
                        }
                    </form>
                    : <div>
                        <h4>Game Over</h4>
                        <button className="game__restart" onClick={restartGame}>
                            Start Again
                        </button>
                    </div>
                }
            </div>
        </section>
    );
};

Game.propTypes = {
    currentFrameIndex: React.PropTypes.number,
    currentScore: React.PropTypes.string,
    currentScoreError: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
    maxScore: React.PropTypes.number
};

const mapStateToProps = ({game: {currentFrameIndex, currentScore, currentScoreError, maxScore}}) => {
    return {currentFrameIndex, currentScore, currentScoreError, maxScore};
};

export default connect(mapStateToProps)(Game);
