import React from 'react';
import Scoreboard  from '../../components/scoreboard/scoreboard.jsx';
import ScoreboardCellContent from '../../components/scoreboard/__cell/scoreboard__cell_type_content.jsx';
import renderer from 'react-test-renderer';

describe('Scoreboard', () => {
    it('ScoreboardCellContent renders correctly', () => {
        const cell1 = renderer.create(
            <ScoreboardCellContent active={false} />
        ).toJSON();
        expect(cell1).toMatchSnapshot();

        const cell2 = renderer.create(
            <ScoreboardCellContent active={true} rolls={[5, 5]} score={14} />
        ).toJSON();
        expect(cell2).toMatchSnapshot();

        const cell3 = renderer.create(
            <ScoreboardCellContent active={true} isLast={true} rolls={[5, 5, 3]} score={13} />
        ).toJSON();
        expect(cell3).toMatchSnapshot();
    });
    it('Scoreboard', () => {
        const scoreboardEmpty = renderer.create(
            <Scoreboard
                currentFrameIndex={0}
                currentPlayerIndex={0}
                playersNumber="1"
                results={[]}
            />
        ).toJSON();
        expect(scoreboardEmpty).toMatchSnapshot();
        const scoreboardFull = renderer.create(
            <Scoreboard
                currentFrameIndex={9}
                currentPlayerIndex={1}
                playersNumber="2"
                results={[[
                    {"rolls": [2, 3], "score": 5, "closed": true},
                    {"rolls": [10], "score": 24, "closed": true},
                    {"rolls": [10], "score": 20, "closed": true},
                    {"rolls": [4, 6], "score": 15, "closed": true},
                    {"rolls": [5, 2], "score": 7, "closed": true},
                    {"rolls": [4, 6], "score": 20, "closed": true},
                    {"rolls": [10], "score": 14, "closed": true},
                    {"rolls": [3, 1], "score": 4, "closed": true},
                    {"rolls": [5, 5], "score": 20, "closed": true},
                    {"rolls": [10, 5, 1], "score": 16, "closed": true}
                ],
				[
				    {"rolls": [4, 6], "score": 15, "closed": true},
				    {"rolls": [5, 5], "score": 20, "closed": true},
				    {"rolls": [10], "score": 20, "closed": true},
				    {"rolls": [3, 7], "score": 11, "closed": true},
				    {"rolls": [1, 9], "score": 13, "closed": true},
				    {"rolls": [3, 1], "score": 4, "closed": true},
				    {"rolls": [3, 7], "score": 20, "closed": true},
				    {"rolls": [10], "score": 16, "closed": true},
				    {"rolls": [5, 1], "score": 6, "closed": true},
				    {"rolls": [5], "score": 5, "closed": false}]
				]}
            />
        ).toJSON();
        expect(scoreboardFull).toMatchSnapshot();

    });
});
