import React from 'react';
import { connect } from 'react-redux';
import { GAME_CONFIG } from '../../config';

import Button from '../button/button.jsx';
import ErrorMessage from '../error-message/error-message.jsx';
import Input from '../input/input.jsx';

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
        <div className="starting-form">
            <blockquote className="starting-form__header">
                <p>Smokey, this is not 'Nam. This is bowling. There are rules.</p>
                <footer>— The Big Lebowski</footer>
            </blockquote>
            <form className="starting-form__content" onSubmit={startGame}>
                <Input
                    max={GAME_CONFIG.maxPlayers}
                    min={GAME_CONFIG.minPlayers}
                    onChange={changePlayers}
                    placeholder="enter number of players"
                    required
                    size="l"
                    type="number"
                    value={playersNumber} />
                <div className="starting-form__submit">
                    <Button action size="l" type="submit">
                        Go!
                    </Button>
                </div>
                {playersError &&
                    <ErrorMessage>{playersError}</ErrorMessage>
                }
            </form>
        </div>
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
