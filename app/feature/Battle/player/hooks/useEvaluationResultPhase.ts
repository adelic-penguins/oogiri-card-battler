import { Phase } from "@/app/types/userState/card";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { currentPhaseAtom, totalPointAtom } from "@/app/state/jotai/atoms";

const useEvaluationResultPhase = (): {
	evaluationResult: string;
	isLoading: boolean;
} => {
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const setTotalPoint = useSetAtom(totalPointAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [evaluationResult, setEvaluationResult] = useState("");
	// TODO: API結合
	useEffect(() => {
		if (!isLoading) {
			const isLoadingTimeoutId = setTimeout(() => {
				const isEvaluationResult = Math.random() < 0.5;
				setEvaluationResult(isEvaluationResult ? "1point!" : "no point...");
				setTotalPoint((prev) => (isEvaluationResult ? prev + 1 : prev));
				setIsLoading(true);
			}, 2000);
			return () => clearTimeout(isLoadingTimeoutId);
		}

		const setCurrentPhaseTimeoutId = setTimeout(() => {
			setCurrentPhase(Phase.answerPhase);
		}, 4000);
		return () => clearTimeout(setCurrentPhaseTimeoutId);
	}, [isLoading]);

	return { evaluationResult, isLoading };
};
export default useEvaluationResultPhase;
