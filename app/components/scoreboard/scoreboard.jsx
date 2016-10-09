import b from 'b_';
import React from 'react';

import { GAME_CONFIG } from '../../config';

import ScoreboardCellTypeContent from './__cell/scoreboard__cell_type_content.jsx';

import './scoreboard.scss';

const Scoreboard = ({currentFrameIndex, currentPlayerIndex, playersNumber, results}) => {
    const frames = new Array(GAME_CONFIG.frames).fill(0);
    const players = new Array(Number(playersNumber)).fill(0);

    return (
        <table className="scoreboard">
            <thead>
                <tr>
                    {frames.map((frame, index) =>
                        <th className="scoreboard__cell" key={index}>
                            {index + 1}
                        </th>
                    )}
                    <th className="scoreboard__cell" />
                </tr>
            </thead>
            <tbody>
                {players.map((player, playerIndex) => {
                    const playerResult = results[playerIndex] || [];

                    return (
                        <tr key={playerIndex}>
                            {frames.map((frame, frameIndex) => (
                                <ScoreboardCellTypeContent
                                    {...playerResult[frameIndex]}
                                    active={frameIndex === currentFrameIndex && playerIndex === currentPlayerIndex}
                                    isLast={frameIndex === frames.length - 1}
                                    key={frameIndex} />
                            ))}
                            <td className={b('scoreboard', 'cell', {type: 'result'})}>
                                {playerResult.reduce((sum, {score}) => sum + score, 0)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

Scoreboard.propTypes = {
    currentFrameIndex: React.PropTypes.number,
    currentPlayerIndex: React.PropTypes.number,
    playersNumber: React.PropTypes.string,
    results: React.PropTypes.array
};

export default Scoreboard;
