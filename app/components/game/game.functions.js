export function isScoreValid(score, frame, framesNumber) {
    if (score === '') {
        return false;
    }
    const numericScore = Number(score);

    if (isNaN(numericScore)) {
        return false;
    }

    return numericScore >= 0 && (numericScore <= framesNumber - frame.score);
}

export function getCurrentFrame(currentFrame, score, pinsNumber) {
    return (currentFrame.score !== null || score === pinsNumber)
        ? {index: currentFrame.index + 1, score: null}
        : {index: currentFrame.index, score};
}
