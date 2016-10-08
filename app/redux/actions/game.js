import * as constants from '../constants/game';

export const changeScore = (score) =>
    ({type: constants.CHANGE_SCORE, score});
export const startGame = () =>
    ({type: constants.START_GAME});
export const finishGame = () =>
    ({type: constants.FINISH_GAME});
export const submitScore = () =>
    ({type: constants.SUBMIT_SCORE});
export const changePlayers = (playersNumber) =>
    ({type: constants.CHANGE_PLAYERS, playersNumber});
