import React from 'react';
import { connect } from 'react-redux';

import Input from '../input/input.jsx';
import ErrorMessage from '../error-message/error-message.jsx';
import * as gameActions from '../../redux/actions/game';

import './scoring-form.scss';

const ScoringForm = ({currentFrameIndex, currentPlayerIndex, currentScore, dispatch, currentScoreError, maxScore}) => {
    const changeScore = ({target: {value}}) =>
        dispatch(gameActions.changeScore(value));
    const submitScore = (e) => {
        e.preventDefault();
        dispatch(gameActions.submitScore());
    };

    return (
        <form className="scoring-form" onSubmit={submitScore}>
            <h4>Frame {currentFrameIndex + 1}, Player {currentPlayerIndex + 1}</h4>
            <Input
                max={maxScore}
                min="0"
                onChange={changeScore}
                placeholder="enter your score"
                type="number"
                value={currentScore} />
            {currentScoreError &&
                <ErrorMessage>{currentScoreError}</ErrorMessage>
            }
        </form>
    );
};

ScoringForm.propTypes = {
    currentFrameIndex: React.PropTypes.number,
    currentPlayerIndex: React.PropTypes.number,
    currentScore: React.PropTypes.string,
    currentScoreError: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    maxScore: React.PropTypes.number
};

const mapStateToProps = ({game: {currentFrameIndex, currentPlayerIndex, currentScore, currentScoreError, maxScore}}) =>
    ({currentFrameIndex, currentPlayerIndex, currentScore, currentScoreError, maxScore});

export default connect(mapStateToProps)(ScoringForm);
