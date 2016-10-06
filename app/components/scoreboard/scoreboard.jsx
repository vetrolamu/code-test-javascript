import b from 'b_';
import React from 'react';

import ScoreboardCellTypeContent from './__cell/scoreboard__cell_type_content.jsx';
import { getResults } from './scoreboard.functions';

import './scoreboard.scss';

const Scoreboard = ({currentFrameIndex, framesNumber, pinsNumber, rolls}) => {
    const frames = new Array(framesNumber).fill(0);
    const results = getResults(rolls, pinsNumber, framesNumber);

    return (
        <table className="scoreboard">
            <thead>
                <tr>
                    {frames.map((frame, index) => (
                        <th className={b('scoreboard', 'cell', {type: 'header'})} key={index}>
                            {index + 1}
                        </th>
                    ))}
                    <th className="scoreboard__cell" />
                </tr>
            </thead>
            <tbody>
                <tr>
                    {frames.map((frame, index) =>
                        <ScoreboardCellTypeContent
                            {...results[index]}
                            active={index === currentFrameIndex}
                            isLast={index === frames.length - 1}
                            key={index} />
                    )}
                    <td className={b('scoreboard', 'cell', {type: 'result'})}>
                        {results.reduce((sum, {score}) => sum + score, 0)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

Scoreboard.propTypes = {
    currentFrameIndex: React.PropTypes.number,
    rolls: React.PropTypes.array.isRequired,
    framesNumber: React.PropTypes.number.isRequired,
    pinsNumber: React.PropTypes.number.isRequired
};

export default Scoreboard;
