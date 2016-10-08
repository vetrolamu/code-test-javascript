import React from 'react';
import { connect } from 'react-redux';

import Input from '../input/input.jsx';
import ErrorMessage from '../error-message/error-message.jsx';
import * as gameActions from '../../redux/actions/game';

import './starting-form.scss';

const ScoringForm = ({dispatch, playersError, maxPlayers, minPlayers, playersNumber}) => {
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
                max={maxPlayers}
                min={minPlayers}
                onChange={changePlayers}
                placeholder="enter number of players"
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
    maxPlayers: React.PropTypes.number,
    minPlayers: React.PropTypes.number,
    playersError: React.PropTypes.string,
    playersNumber: React.PropTypes.string
};

const mapStateToProps = ({game: {maxPlayers, minPlayers, playersError, playersNumber}}) =>
    ({maxPlayers, minPlayers, playersError, playersNumber});

export default connect(mapStateToProps)(ScoringForm);
