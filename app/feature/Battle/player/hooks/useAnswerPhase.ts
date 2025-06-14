import { Phase } from "@/app/types/userState/card";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";

const useAnswerPhase = () => {
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	// TODO: API結合
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setCurrentPhase(Phase.evaluationPhase);
		}, 5000);
		return () => clearTimeout(timeoutId);
	}, []);
};
export default useAnswerPhase;
