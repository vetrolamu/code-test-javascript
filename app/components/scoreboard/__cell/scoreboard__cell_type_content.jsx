import b from 'b_';
import React from 'react';

import '../scoreboard.scss';
import './scoreboard__cell_type_content.scss';

const ScoreboardCellTypeContent = ({firstRoll, secondRoll, score, isStrike, isSpare, active}) => {
    const className = b('scoreboard', 'cell', {
        active,
        spare: isSpare,
        strike: isStrike,
        type: 'content'
    });

    return (
        <td className={className}>
            <div className="scoreboard__roll">{firstRoll}</div>
            <div className="scoreboard__roll">{secondRoll}</div>
            <div className="scoreboard__frame-score">{score}</div>
        </td>
    );
};

ScoreboardCellTypeContent.propTypes = {
    active: React.PropTypes.bool.isRequired,
    firstRoll: React.PropTypes.number,
    isSpare: React.PropTypes.bool,
    isStrike: React.PropTypes.bool,
    score: React.PropTypes.number,
    secondRoll: React.PropTypes.number
};

export default ScoreboardCellTypeContent;
