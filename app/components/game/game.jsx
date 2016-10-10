import React from 'react';
import { connect } from 'react-redux';

import Button from '../button/button.jsx';
import Scoreboard from '../scoreboard/scoreboard.jsx';
import ScoringForm from '../scoring-form/scoring-form.jsx';
import StartingForm from '../starting-form/starting-form.jsx';
import * as gameActions from '../../redux/actions/game';

import './game.scss';

const Game = ({currentFrameIndex, currentPlayerIndex, dispatch, isConfiguring, playersNumber, results}) => {
    const finishGame = () =>
        dispatch(gameActions.finishGame());

    return (
        <section className="game">
            {isConfiguring
                ? <StartingForm />
                : <div className="game__progress">
                    <Scoreboard
                        currentFrameIndex={currentFrameIndex}
                        currentPlayerIndex={currentPlayerIndex}
                        playersNumber={playersNumber}
                        results={results} />
                    {currentFrameIndex === null
                        ? <Button action onClick={finishGame} size="l">Start again</Button>
                        : <ScoringForm />
                    }
                </div>
            }
        </section>
    );
};

Game.propTypes = {
    currentFrameIndex: React.PropTypes.number,
    currentPlayerIndex: React.PropTypes.number,
    dispatch: React.PropTypes.func.isRequired,
    isConfiguring: React.PropTypes.bool,
    playersNumber: React.PropTypes.string,
    results: React.PropTypes.array
};

const mapStateToProps = ({game}) => {
    return {
        currentFrameIndex: game.currentFrameIndex,
        currentPlayerIndex: game.currentPlayerIndex,
        isConfiguring: game.isConfiguring,
        playersNumber: game.playersNumber,
        results: game.results
    };
};

export default connect(mapStateToProps)(Game);
