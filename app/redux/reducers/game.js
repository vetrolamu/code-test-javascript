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

const resultUpdaters = (function() {
    let list = [];
    const updater = {
        init() {
            this.waitingList = [];
            return this;
        },
        updateFromWaitingList(results, score) {
            this.waitingList = this.waitingList
                .map(item => {
                    results[item.index].score += score;
                    return {index: item.index, times: item.times - 1};
                })
                .filter(({times}) => times > 0);

            return results;
        },
        update(oldResults = [], score, index) {
            let results = oldResults.slice();
            const isFirstRollInFrame = !results[index];

            results = this.updateFromWaitingList(results, score);
            results[index] = results[index] || {rolls: [], score: 0};
            results[index].rolls.push(score);
            results[index].score += score;

            // last frame
            if (index === GAME_CONFIG.frames - 1) {
                const rollsNumber = results[index].rolls.length;

                results[index].closed = (
                    rollsNumber === 3 ||
                    rollsNumber === 2 && results[index].score < GAME_CONFIG.pins
                );

                return results;
            }

            if (isFirstRollInFrame) {
                // strike
                if (score === GAME_CONFIG.pins) {
                    this.waitingList.push({index, times: 2});
                    results[index].closed = true;
                }
                return results;
            }

            // spare
            if (results[index].score === GAME_CONFIG.pins) {
                this.waitingList.push({index, times: 1});
            }

            results[index].closed = true;

            return results;
        }
    };

    return {
        get(playerIndex) {
            if (list[playerIndex] === undefined) {
                list[playerIndex] = Object.create(updater).init();
            }

            return list[playerIndex];
        },
        clear() {
            list = [];
        }
    };
}());

function getMaxScore(frame) {
    if (frame && (frame.score % GAME_CONFIG.pins)) {
        return frame.rolls.length === 2
            ? 2 * GAME_CONFIG.pins - frame.score
            : GAME_CONFIG.pins - frame.score;
    }

    return GAME_CONFIG.pins;
}

function isNumericInputValid({value, min, max}) {
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

function shouldMoveNext(playerResult) {
    return playerResult[playerResult.length - 1].closed;
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

function getNextPosition(playerResults, playerIndex, frameIndex, playersNumber) {
    if (!shouldMoveNext(playerResults)) {
        return [frameIndex, playerIndex];
    }

    const nextPlayerIndex = getNextPlayerIndex(playerIndex, playersNumber, frameIndex);
    const nextFrameIndex = getNextFrameIndex(frameIndex, nextPlayerIndex);

    return [nextFrameIndex, nextPlayerIndex];
}

function submitScore(state) {
    const playerResults = resultUpdaters
        .get(state.currentPlayerIndex)
        .update(state.results[state.currentPlayerIndex], Number(state.currentScore), state.currentFrameIndex);
    const results = Object.assign([], state.results, {[state.currentPlayerIndex]: playerResults});
    const [nextFrameIndex, nextPlayerIndex] = getNextPosition(
        playerResults,
        state.currentPlayerIndex,
        state.currentFrameIndex,
        Number(state.playersNumber)
    );
    const nextMaxScore = getMaxScore(results[nextPlayerIndex] && results[nextPlayerIndex][nextFrameIndex]);

    return {
        ...state,
        results,
        maxScore: nextMaxScore,
        currentFrameIndex: nextFrameIndex,
        currentPlayerIndex: nextPlayerIndex,
        currentScore: ''
    };
}

export default (state=initialState, action) => {
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

        case constants.CHANGE_SCORE:
            return {...state, currentScore: action.score, currentScoreError: null};

        case constants.CHANGE_PLAYERS:
            return {...state, playersNumber: action.playersNumber, playersError: null};

        case constants.FINISH_GAME:
            resultUpdaters.clear();

            return {...initialState};

        default:
            return state;
    }
};
