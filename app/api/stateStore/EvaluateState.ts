enum EvaluateState {
    IDLE = 'idle',
    EVALUATING = 'evaluating',
}

let currentEvaluateState = {
    value: EvaluateState.IDLE,
};

export { EvaluateState, currentEvaluateState };
