import b from 'b_';
import React from 'react';

import '../scoreboard.scss';
import './scoreboard__cell_type_content.scss';

const ScoreboardCellTypeContent = ({rolls=[], score, isLast, active}) => {
    const className = b('scoreboard', 'cell', {
        active,
        last: isLast,
        type: 'content'
    });

    return (
        <td className={className}>
            <div className="scoreboard__roll">{rolls[0]}</div>
            <div className="scoreboard__roll">{rolls[1]}</div>
            {isLast &&
                <div className="scoreboard__roll">{rolls[2]}</div>}
            <div className="scoreboard__frame-score">{score}</div>
        </td>
    );
};

ScoreboardCellTypeContent.propTypes = {
    active: React.PropTypes.bool.isRequired,
    isLast: React.PropTypes.bool,
    rolls: React.PropTypes.array,
    score: React.PropTypes.number
};

export default ScoreboardCellTypeContent;
