function getStrikeBonus(index, rolls) {
    return (rolls[index + 1] || 0) + (rolls[index + 2] || 0);
}

function getSpareBonus(index, rolls) {
    return rolls[index + 1] || 0;
}

/**
 * Returns player's results for every frame
 * @param {Array} rolls
 * @param {Number} pinsNumber
 * @param {Number} framesNumber
 * @returns {Array}
 */
export function getResults(rolls, pinsNumber, framesNumber) {
    const results = [];
    let resultIndex = 0;

    rolls.forEach((score, index) => {
        const isFirstRollInFrame = results[resultIndex] === undefined;

        results[resultIndex] = results[resultIndex] || {rolls: [], score: 0};
        results[resultIndex].rolls.push(score);
        results[resultIndex].score += score;

        // last frame
        if (resultIndex === framesNumber - 1) {
            return;
        }

        if (isFirstRollInFrame) {
            // strike
            if (score === pinsNumber) {
                results[resultIndex].score += getStrikeBonus(index, rolls);
                resultIndex += 1;
            }
            return;
        }

        // spare
        if (results[resultIndex].score === pinsNumber) {
            results[resultIndex].score += getSpareBonus(index, rolls);
        }

        resultIndex += 1;
    });

    return results;
}
