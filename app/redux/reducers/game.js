import * as constants from '../constants/game';

const GAME_CONFIG = {
    frames: 10,
    maxPlayers: 5,
    minPlayers: 1,
    pins: 10
};

const initialState = {
    currentFrameIndex: null,
    currentPlayerIndex: null,
    currentScore: '',
    currentScoreError: null,
    framesNumber: GAME_CONFIG.frames,
    isConfiguring: true,
    maxPlayers: GAME_CONFIG.maxPlayers,
    maxScore: GAME_CONFIG.pins,
    minPlayers: GAME_CONFIG.minPlayers,
    playersError: null,
    playersNumber: '',
    results: []
};

const resultUpdaters = (function() {
    let list = [];
    const updater = {
        waitingList: [],
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
                list[playerIndex] = Object.create(updater);
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

function getNextPosition(results, playerIndex, playersNumber) {
    const lastIndex = results.length - 1;
    const lastResult = results[lastIndex];
    const isLastFrame = lastIndex === GAME_CONFIG.frames - 1;
    const isLastPlayer = playerIndex === playersNumber - 1;

    if (isLastFrame && isLastPlayer) {
        return lastResult.closed
            ? [null, null]
            : [lastIndex, playerIndex];
    }

    if (lastResult.closed) {
        return isLastPlayer
            ? [lastIndex + 1, 0]
            : [lastIndex, playerIndex + 1];
    }

    return [lastIndex, playerIndex];
}

function submitScore(state) {
    const playerResults = resultUpdaters
        .get(state.currentPlayerIndex)
        .update(state.results[state.currentPlayerIndex], Number(state.currentScore), state.currentFrameIndex);
    const [nextFrameIndex, nextPlayerIndex] = getNextPosition(
        playerResults,
        state.currentPlayerIndex,
        Number(state.playersNumber)
    );
    const results = Object.assign([], state.results, {[state.currentPlayerIndex]: playerResults});
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
