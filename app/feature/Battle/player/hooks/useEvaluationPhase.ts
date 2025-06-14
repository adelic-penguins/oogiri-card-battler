import { useWebSocketForPlayerAnswerEvaluationPhase } from "@/app/hooks/useWebSocket";

const useEvaluationPhase = () => {
	useWebSocketForPlayerAnswerEvaluationPhase();
};
export default useEvaluationPhase;
