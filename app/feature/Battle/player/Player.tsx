"use client";

import React, { useEffect } from "react";
import CardUsagePhase from "@/app/feature/Battle/player/components/CardUsagePhase";
import AbilityPhase from "@/app/feature/Battle/player/components/AbilityPhase";
import ThemeInputPhase from "@/app/feature/Battle/player/components/ThemeInputPhase";
import AnswerPhase from "@/app/feature/Battle/player/components/AnswerPhase";
import EvaluationPhase from "@/app/feature/Battle/player/components/EvaluationPhase";
import EvaluationResultPhase from "@/app/feature/Battle/player/components/EvaluationResultPhase";
import GameEndPhase from "@/app/feature/Battle/player/components/GameEndPhase";
import { Phase } from "@/app/types/userState/card";
import { useAtomValue } from "jotai";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";
import { useWebSocketForPlayerBattleComponent } from "@/app/hooks/useWebSocket";

const Player: React.FC = () => {
	const currentPhase = useAtomValue(currentPhaseAtom);
	useWebSocketForPlayerBattleComponent();

	const currentPhaseComponent = (phase: Phase) => {
		switch (phase) {
			case Phase.cardUsagePhase:
				return <CardUsagePhase />;
			case Phase.abilityPhase:
				return <AbilityPhase />;
			case Phase.themeInputPhase:
				return <ThemeInputPhase />;
			case Phase.answerPhase:
				return <AnswerPhase />;
			case Phase.evaluationPhase:
				return <EvaluationPhase />;
			case Phase.evaluationResultPhase:
				return <EvaluationResultPhase />;
			case Phase.gameEndPhase:
				return <GameEndPhase />;
		}
	};
	return currentPhaseComponent(currentPhase);
};
export default Player;
