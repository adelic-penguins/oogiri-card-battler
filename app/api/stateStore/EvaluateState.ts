enum EvaluateState {
    IDLE = 'idle',
    EVALUATING = 'evaluating',
}

let currentEvaluateState: EvaluateState = EvaluateState.IDLE;

export { EvaluateState, currentEvaluateState };
