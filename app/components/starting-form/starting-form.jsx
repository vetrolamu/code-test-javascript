import React from 'react';
import { connect } from 'react-redux';
import { GAME_CONFIG } from '../../config';

import Input from '../input/input.jsx';
import ErrorMessage from '../error-message/error-message.jsx';
import * as gameActions from '../../redux/actions/game';

import './starting-form.scss';

const ScoringForm = ({dispatch, playersError, playersNumber}) => {
    const startGame = (e) => {
        e.preventDefault();
        dispatch(gameActions.startGame());
    };
    const changePlayers = ({target: {value}}) =>
        dispatch(gameActions.changePlayers(value));

    return (
        <form className="starting-form" onSubmit={startGame}>
            <h4>Start Game</h4>
            <Input
                max={GAME_CONFIG.maxPlayers}
                min={GAME_CONFIG.minPlayers}
                onChange={changePlayers}
                placeholder="enter number of players"
                size="l"
                type="number"
                value={playersNumber} />
            {playersError &&
                <ErrorMessage>{playersError}</ErrorMessage>
            }
        </form>
    );
};

ScoringForm.propTypes = {
    dispatch: React.PropTypes.func,
    playersError: React.PropTypes.string,
    playersNumber: React.PropTypes.string
};

const mapStateToProps = ({game: {playersError, playersNumber}}) =>
    ({playersError, playersNumber});

export default connect(mapStateToProps)(ScoringForm);
