import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
	evaluationResultAtom,
	totalPointAtom,
} from "@/app/state/jotai/atoms";

const useEvaluationResultPhase = (): {
	evaluationResultText: string;
	isLoading: boolean;
} => {
	const setTotalPoint = useSetAtom(totalPointAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [evaluationResult] = useAtom(evaluationResultAtom);
	const [evaluationResultText, setEvaluationResultText] = useState("");

	useEffect(() => {
		if (!isLoading) {
			const isLoadingTimeoutId = setTimeout(() => {
				const isEvaluationResult = evaluationResult === "success";
				setEvaluationResultText(isEvaluationResult ? "1point!" : "no point...");
				setTotalPoint((prev) => (isEvaluationResult ? prev + 1 : prev));
				setIsLoading(true);
			}, 2000);
			return () => clearTimeout(isLoadingTimeoutId);
		}
	}, [isLoading, setTotalPoint, evaluationResult]);

	return { evaluationResultText, isLoading };
};
export default useEvaluationResultPhase;
