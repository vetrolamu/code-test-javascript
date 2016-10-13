import { GAME_CONFIG } from '../../config';
import * as constants from '../constants/game';

const initialState = {
    currentFrameIndex: null,
    currentPlayerIndex: null,
    currentScore: '',
    currentScoreError: null,
    isConfiguring: true,
    maxScore: GAME_CONFIG.pins,
    playersError: null,
    playersNumber: '',
    results: []
};

export function isLastFrameClosed(frame) {
    const rollsNumber = frame.rolls.length;

    return (
        rollsNumber === 3 ||
        rollsNumber === 2 && frame.score < GAME_CONFIG.pins
    );
}

export function updateWaitingResultsByScore(results=[], score) {
    return results.map(item => {
        if (item.waiting > 0) {
            item.score += score;
            item.waiting -= 1;

            if (item.waiting === 0) {
                delete item.waiting;
            }
        }

        return item;
    });
}

export function updateResultsByScore(prevResults=[], score) {
    let results = prevResults.slice();
    const lastIndex = results.length - 1;
    const index = !results[lastIndex] || results[lastIndex].closed
        ? lastIndex + 1
        : lastIndex;

    results[index] = results[index] || {rolls: [], score: 0};
    results[index].rolls.push(score);
    results[index].score += score;
    results[index].closed = false;

    // last frame
    if (index === GAME_CONFIG.frames - 1) {
        results[index].closed = isLastFrameClosed(results[index]);

        return results;
    }

    if (results[index].rolls.length === 1) {
        // strike
        if (score === GAME_CONFIG.pins) {
            results[index].closed = true;
            results[index].waiting = 2;
        }
        return results;
    }

    // spare
    if (results[index].score === GAME_CONFIG.pins) {
        results[index].waiting = 1;
    }

    results[index].closed = true;

    return results;
}

export function getMaxScore(frame) {
    if (frame && (frame.score % GAME_CONFIG.pins)) {
        return frame.rolls.length === 2
            ? 2 * GAME_CONFIG.pins - frame.score
            : GAME_CONFIG.pins - frame.score;
    }

    return GAME_CONFIG.pins;
}

export function isNumericInputValid({value, min, max}) {
    if (value === '') {
        return false;
    }
    const numericValue = Number(value);

    return !(
        isNaN(numericValue) ||
        typeof min === 'number' && numericValue < min ||
        typeof max === 'number' && numericValue > max
    );
}

function shouldMoveNext(playerResults) {
    return playerResults[playerResults.length - 1].closed;
}

function getNextPlayerIndex(playerIndex, playersNumber, frameIndex) {
    if (playerIndex < playersNumber - 1) {
        return playerIndex + 1;
    }

    return frameIndex === GAME_CONFIG.frames - 1
        ? null
        : 0;
}

function getNextFrameIndex(frameIndex, nextPlayerIndex) {
    if (nextPlayerIndex === 0) {
        return frameIndex + 1;
    }
    if (nextPlayerIndex === null) {
        return null;
    }

    return frameIndex;
}

export function getNextPosition(playerResults, playerIndex, playersNumber) {
    const frameIndex = playerResults.length - 1;

    if (!shouldMoveNext(playerResults)) {
        return [frameIndex, playerIndex];
    }

    const nextPlayerIndex = getNextPlayerIndex(playerIndex, playersNumber, frameIndex);
    const nextFrameIndex = getNextFrameIndex(frameIndex, nextPlayerIndex);

    return [nextFrameIndex, nextPlayerIndex];
}

function getRandomScore(maxScore) {
    return Math.floor(Math.random() * (maxScore + 1));
}

function submitScore(state, score) {
    let playerResults = state.results[state.currentPlayerIndex];
    let numericScore = score || Number(state.currentScore);

    playerResults = updateWaitingResultsByScore(playerResults, numericScore);
    playerResults = updateResultsByScore(playerResults, numericScore);

    const results = Object.assign([], state.results, {[state.currentPlayerIndex]: playerResults});
    const [nextFrameIndex, nextPlayerIndex] = getNextPosition(
        playerResults,
        state.currentPlayerIndex,
        Number(state.playersNumber)
    );
    const nextMaxScore = getMaxScore(results[nextPlayerIndex] && results[nextPlayerIndex][nextFrameIndex]);

    return {
        ...state,
        results,
        maxScore: nextMaxScore,
        currentFrameIndex: nextFrameIndex,
        currentPlayerIndex: nextPlayerIndex,
        currentScore: '',
        currentScoreError: null
    };
}

export default (state=initialState, action) => { // eslint-disable-line complexity
    switch (action.type) {
        case constants.START_GAME:
            if (!isNumericInputValid({value: state.playersNumber, min: state.minPlayers, max: state.maxPlayers})) {
                return {...state, playersError: 'Wrong value'};
            }

            return {...state, isConfiguring: false, currentFrameIndex: 0, currentPlayerIndex: 0};

        case constants.SUBMIT_SCORE:
            if (!isNumericInputValid({value: state.currentScore, min: 0, max: state.maxScore})) {
                return {...state, currentScoreError: 'Wrong value'};
            }

            return submitScore(state);

        case constants.SUBMIT_RANDOM_SCORE:
            const score = getRandomScore(state.maxScore);

            return submitScore(state, score);

        case constants.CHANGE_SCORE:
            return {...state, currentScore: action.score, currentScoreError: null};

        case constants.CHANGE_PLAYERS:
            return {...state, playersNumber: action.playersNumber, playersError: null};

        case constants.FINISH_GAME:
            return {...initialState};

        default:
            return state;
    }
};
