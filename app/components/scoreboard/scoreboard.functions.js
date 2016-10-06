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
 * @returns {Array}
 */
export function getResults(rolls, pinsNumber) {
    const results = [];
    let resultIndex = 0;

    rolls.forEach((score, index) => {
        // first roll in frame
        if (results[resultIndex] === undefined) {
            results[resultIndex] = {
                firstRoll: score,
                score
            };

            // strike
            if (score === pinsNumber) {
                results[resultIndex].isStrike = true;
                results[resultIndex].score += getStrikeBonus(index, rolls);
                resultIndex += 1;
            }

            return;
        }

        // second roll in frame
        results[resultIndex].secondRoll = score;
        results[resultIndex].score += score;

        // spare
        if (results[resultIndex].score === pinsNumber) {
            results[resultIndex].isSpare = true;
            results[resultIndex].score += getSpareBonus(index, rolls);
        }

        resultIndex += 1;
    });

    return results;
}
