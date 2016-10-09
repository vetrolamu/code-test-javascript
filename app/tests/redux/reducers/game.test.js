import {
    getMaxScore,
    isNumericInputValid,
    getNextPosition,
    updateResultsByWaitingList,
    updateResultsByScore,
    isLastFrameClosed
} from '../../../redux/reducers/game';
import { GAME_CONFIG } from '../../../config';

describe('Game Reducer', () => {
    it('getMaxScore works correctly', () => {
        expect(getMaxScore())
            .toEqual(GAME_CONFIG.frames);
        expect(getMaxScore({rolls: [3], score: 3}))
            .toEqual(GAME_CONFIG.frames - 3);
        expect(getMaxScore({rolls: [10, 10], score: 20}))
            .toEqual(GAME_CONFIG.frames);
        expect(getMaxScore({rolls: [10, 9], score: 19}))
            .toEqual(GAME_CONFIG.frames - 9);
    });
    it('isNumericInputValid works correctly', () => {
        expect(isNumericInputValid({value: '', min: 0, max: 10}))
            .toEqual(false);
        expect(isNumericInputValid({value: 'w', min: 0, max: 10}))
            .toEqual(false);
        expect(isNumericInputValid({value: '15', min: 0, max: 10}))
            .toEqual(false);
        expect(isNumericInputValid({value: '0', min: 0, max: 10}))
            .toEqual(true);
        expect(isNumericInputValid({value: '10', min: 0, max: 10}))
            .toEqual(true);
        expect(isNumericInputValid({value: '-5', min: -5, max: 10}))
            .toEqual(true);
        expect(isNumericInputValid({value: '7', min: 0, max: 10}))
            .toEqual(true);
    });
    it('getNextPosition works correctly', () => {
        expect(getNextPosition([
            {rolls: [0, 0], score: 0, closed: true}
        ], 0, 1))
            .toEqual([1, 0]);
        expect(getNextPosition([
            {rolls: [0, 0], score: 0, closed: true},
            {rolls: [0], score: 0, closed: false}
        ], 0, 1))
            .toEqual([1, 0]);
        expect(getNextPosition([
            {rolls: [0, 0], score: 0, closed: true}, // 1
            {rolls: [0, 0], score: 0, closed: true}, // 2
            {rolls: [0, 0], score: 0, closed: true}, // 3
            {rolls: [0, 0], score: 0, closed: true}, // 4
            {rolls: [0, 0], score: 0, closed: true}, // 5
            {rolls: [0, 0], score: 0, closed: true}, // 6
            {rolls: [0, 0], score: 0, closed: true}, // 7
            {rolls: [0, 0], score: 0, closed: true}, // 8
            {rolls: [0, 0], score: 0, closed: true}, // 9
            {rolls: [0, 0], score: 0, closed: true}  // 10
        ], 9, 0, 1))
            .toEqual([null, null]);
        expect(getNextPosition([
            {rolls: [0, 0], score: 0, closed: true},
            {rolls: [0, 0], score: 0, closed: true}
        ], 3, 5))
            .toEqual([1, 4]);
        expect(getNextPosition([
            {rolls: [0, 0], score: 0, closed: true},
            {rolls: [0, 0], score: 0, closed: true}
        ], 4, 5))
            .toEqual([2, 0]);
    });

    it('updateResultsByWaitingList works correctly', () => {

        expect(updateResultsByWaitingList(undefined, undefined, 0))
            .toEqual([[], []]);
        expect(updateResultsByWaitingList(
            [{rolls: [4, 6], score: 10, closed: true}],
            [{index: 0, times: 1}],
            4
        ))
            .toEqual([
                [{rolls: [4, 6], score: 14, closed: true}],
                []
            ]);
        expect(updateResultsByWaitingList(
            [{rolls: [10], score: 10, closed: true}],
            [{index: 0, times: 2}],
            4
        ))
            .toEqual([
                [{rolls: [10], score: 14, closed: true}],
                [{index: 0, times: 1}]
            ]);
        expect(updateResultsByWaitingList(
            [
                {rolls: [10], score: 20, closed: true},
                {rolls: [10], score: 10, closed: true}
            ],
            [
                {index: 0, times: 2},
                {index: 1, times: 2}
            ],
            4
        ))
            .toEqual([
                [
                    {rolls: [10], score: 24, closed: true},
                    {rolls: [10], score: 14, closed: true}
                ],
                [
                    {index: 0, times: 1},
                    {index: 1, times: 1}
                ]
            ]);
    });
    it('updateResultsByScore works correctly', () => {
        expect(updateResultsByScore(undefined, undefined, 0))
            .toEqual([[{rolls: [0], score: 0, closed: false}], []]);
        expect(updateResultsByScore(
            [{rolls: [10], score: 10, closed: true}],
            [{index: 0, times: 1}],
            10
        ))
            .toEqual([
                [
                    {rolls: [10], score: 10, closed: true},
                    {rolls: [10], score: 10, closed: true}
                ],
                [
                    {index: 0, times: 1},
                    {index: 1, times: 2}
                ]
            ]);
        expect(updateResultsByScore(
            [
                {rolls: [10], score: 10, closed: true},
                {rolls: [3], score: 3, closed: false}
            ],
            [],
            7
        ))
            .toEqual([
                [
                    {rolls: [10], score: 10, closed: true},
                    {rolls: [3, 7], score: 10, closed: true}
                ],
                [
                    {index: 1, times: 1}
                ]
            ]);
        expect(updateResultsByScore(
            [
                {rolls: [10], score: 10, closed: true}, // 1
                {rolls: [10], score: 10, closed: true}, // 2
                {rolls: [10], score: 10, closed: true}, // 3
                {rolls: [10], score: 10, closed: true}, // 4
                {rolls: [10], score: 10, closed: true}, // 5
                {rolls: [10], score: 10, closed: true}, // 6
                {rolls: [10], score: 10, closed: true}, // 7
                {rolls: [10], score: 10, closed: true}, // 8
                {rolls: [10], score: 10, closed: true}, // 9
                {rolls: [4], score: 4, closed: false} // 10
            ],
            [],
            6
        ))
            .toEqual([
                [
                    {rolls: [10], score: 10, closed: true}, // 1
                    {rolls: [10], score: 10, closed: true}, // 2
                    {rolls: [10], score: 10, closed: true}, // 3
                    {rolls: [10], score: 10, closed: true}, // 4
                    {rolls: [10], score: 10, closed: true}, // 5
                    {rolls: [10], score: 10, closed: true}, // 6
                    {rolls: [10], score: 10, closed: true}, // 7
                    {rolls: [10], score: 10, closed: true}, // 8
                    {rolls: [10], score: 10, closed: true}, // 9
                    {rolls: [4, 6], score: 10, closed: false} // 10
                ],
                []
            ]);
    });
    it('isLastFrameClosed works correctly', () => {
        expect(isLastFrameClosed({rolls: [3], score: 3, closed: false}))
            .toEqual(false);
        expect(isLastFrameClosed({rolls: [3, 7], score: 10, closed: false}))
            .toEqual(false);
        expect(isLastFrameClosed({rolls: [10], score: 10, closed: false}))
            .toEqual(false);
        expect(isLastFrameClosed({rolls: [10, 1], score: 11, closed: false}))
            .toEqual(false);
        expect(isLastFrameClosed({rolls: [10, 10], score: 20, closed: false}))
            .toEqual(false);
        expect(isLastFrameClosed({rolls: [2, 4], score: 6, closed: false}))
            .toEqual(true);
        expect(isLastFrameClosed({rolls: [10, 5, 2], score: 17, closed: false}))
            .toEqual(true);
        expect(isLastFrameClosed({rolls: [10, 10, 10], score: 30, closed: false}))
            .toEqual(true);
    });
});
