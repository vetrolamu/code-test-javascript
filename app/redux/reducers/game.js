import * as constants from '../constants/game';

const GAME_CONFIG = {
    frames: 10,
    pins: 10
};
const initialState = {
    framesNumber: GAME_CONFIG.frames,
    currentFrameIndex: 0,
    currentScore: '',
    currentScoreError: null,
    results: [],
    maxScore: GAME_CONFIG.pins
};
let waitingList = [];

function getMaxScore(frame) {
    if (frame && (frame.score % GAME_CONFIG.pins)) {
        return frame.rolls.length === 2
            ? 2 * GAME_CONFIG.pins - frame.score
            : GAME_CONFIG.pins - frame.score;
    }

    return GAME_CONFIG.pins;
}

function isScoreValid(score, maxScore) {
    if (score === '') {
        return false;
    }
    const numericScore = Number(score);

    if (isNaN(numericScore)) {
        return false;
    }

    return numericScore >= 0 && numericScore <= maxScore;
}

/**
 * Updates array of results by new score. And returns updated array.
 * @param {Array} oldResults
 * @param {Number} score
 * @param {Number} index
 * @returns {Array}
 */
function updateResults(oldResults, score, index) {
    const results = oldResults.slice();
    const isFirstRollInFrame = !results[index];

    waitingList = waitingList
        .map(item => {
            results[item.index].score += score;
            return {index: item.index, times: item.times - 1};
        })
        .filter(({times}) => times > 0);

    results[index] = results[index] || {rolls: [], score: 0};
    results[index].rolls.push(score);
    results[index].score += score;

    // last frame
    if (index === GAME_CONFIG.frames - 1) {
        const rollsNumber = results[index].rolls.length;

        results[index].closed = rollsNumber === 3 || rollsNumber === 2 && results[index].score < GAME_CONFIG.pins;

        return results;
    }

    if (isFirstRollInFrame) {
        // strike
        if (score === GAME_CONFIG.pins) {
            waitingList.push({index, times: 2});
            results[index].closed = true;
        }
        return results;
    }

    // spare
    if (results[index].score === GAME_CONFIG.pins) {
        waitingList.push({index, times: 1});
    }

    results[index].closed = true;

    return results;
}

function getCurrentFrameIndex(results) {
    const lastIndex = results.length - 1;
    const lastResult = results[lastIndex];

    if (lastIndex === GAME_CONFIG.frames - 1) {
        return lastResult.closed
            ? null
            : lastIndex;
    }

    return lastResult.closed
        ? lastIndex + 1
        : lastIndex;
}

export default (state=initialState, action) => {
    switch (action.type) {
        case constants.SUBMIT_SCORE:
            if (!isScoreValid(state.currentScore, state.maxScore)) {
                return {...state, currentScoreError: 'Wrong value'};
            }

            const results = updateResults(state.results, Number(state.currentScore), state.currentFrameIndex);
            const currentFrameIndex = getCurrentFrameIndex(results);
            const maxScore = getMaxScore(results[currentFrameIndex]);

            return {...state, results, maxScore, currentFrameIndex, currentScore: ''};

        case constants.CHANGE_SCORE:
            return {...state, currentScore: action.score, currentScoreError: null};

        case constants.RESTART_GAME:
            waitingList = [];

            return {...initialState};

        default:
            return state;
    }
};
