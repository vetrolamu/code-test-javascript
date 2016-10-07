import * as constants from '../constants/game';

export const changeScore = (score) =>
    ({type: constants.CHANGE_SCORE, score});

export const restartGame = () =>
    ({type: constants.RESTART_GAME});

export const submitScore = () =>
    ({type: constants.SUBMIT_SCORE});
