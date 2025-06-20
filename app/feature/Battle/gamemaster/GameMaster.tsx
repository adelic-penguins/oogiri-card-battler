"use client";

import React from "react";
import CardUsagePhase from "./components/CardUsagePhase";
import ThemeInputPhase from "./components/ThemeInputPhase";
import AnswerPhase from "./components/AnswerPhase";
import EvaluationPhase from "./components/EvaluationPhase";
import EvaluationResultPhase from "./components/EvaluationResultPhase";
import { Phase } from "@/app/types/userState/card";
import { useAtomValue } from "jotai";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";
import { useWebSocketForGameMasterBattleComponent } from "@/app/hooks/useWebSocket";

const GameMaster: React.FC = () => {
	const currentPhase = useAtomValue(currentPhaseAtom);
	useWebSocketForGameMasterBattleComponent();

	const currentPhaseComponent = (phase: Phase) => {
		switch (phase) {
			case Phase.cardUsagePhase:
				return <CardUsagePhase />;
			case Phase.themeInputPhase:
				return <ThemeInputPhase />;
			case Phase.answerPhase:
				return <AnswerPhase />;
			case Phase.evaluationPhase:
				return <EvaluationPhase />;
			case Phase.evaluationResultPhase:
				return <EvaluationResultPhase />;
		}
	};
	return currentPhaseComponent(currentPhase);
};
export default GameMaster;
