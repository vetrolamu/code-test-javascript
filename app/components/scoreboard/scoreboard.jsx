import b from 'b_';
import React from 'react';
import { connect } from 'react-redux';

import ScoreboardCellTypeContent from './__cell/scoreboard__cell_type_content.jsx';

import './scoreboard.scss';

const Scoreboard = ({currentFrameIndex, framesNumber, results}) => {
    const frames = new Array(framesNumber).fill(0);

    return (
        <table className="scoreboard">
            <thead>
                <tr>
                    {frames.map((frame, index) => (
                        <th className="scoreboard__cell" key={index}>
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
    framesNumber: React.PropTypes.number,
    pinsNumber: React.PropTypes.number,
    results: React.PropTypes.array
};


const mapStateToProps = ({game: {currentFrameIndex, framesNumber, pinsNumber, results}}) => {
    return {currentFrameIndex, framesNumber, pinsNumber, results};
};

export default connect(mapStateToProps)(Scoreboard);
