export function getMaxScore(frame, pinsNumber) {
    if (frame.score % pinsNumber === 0) {
        return pinsNumber;
    }

    return frame.rollIndex === 2
        ? 2 * pinsNumber - frame.score
        : pinsNumber - frame.score;
}

export function isScoreValid(score, frame, pinsNumber) {
    if (score === '') {
        return false;
    }
    const numericScore = Number(score);

    if (isNaN(numericScore)) {
        return false;
    }

    return numericScore >= 0 && numericScore <= getMaxScore(frame, pinsNumber);
}

function getCurrentLastFrame(currentFrame, score, pinsNumber) {
    const newScore = currentFrame.score + score;

    return (currentFrame.rollIndex === 0 || currentFrame.rollIndex === 1 && newScore >= pinsNumber)
        ? {
            index: currentFrame.index,
            rollIndex: currentFrame.rollIndex + 1,
            score: newScore
        }
        : null;
}

export function getCurrentFrame(currentFrame, score, pinsNumber, framesNumber) {
    if (currentFrame.index === framesNumber - 1) {
        return getCurrentLastFrame(currentFrame, score, pinsNumber);
    }

    return (currentFrame.rollIndex === 1 || score === pinsNumber)
        ? {
            index: currentFrame.index + 1,
            rollIndex: 0,
            score: null
        }
        : {
            index: currentFrame.index,
            rollIndex: 1,
            score
        };
}
