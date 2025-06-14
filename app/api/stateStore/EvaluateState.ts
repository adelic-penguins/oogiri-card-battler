enum EvaluateState {
    IDLE = 'idle',
    EVALUATING = 'evaluating',
}

const currentEvaluateState = {
    value: EvaluateState.IDLE,
};

export { EvaluateState, currentEvaluateState };
