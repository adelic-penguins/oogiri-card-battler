"use client";

import React, { useState } from "react";
import CardUsagePhase from "@/app/feature/Battle/player/components/CardUsagePhase";
import AbilityPhase from "@/app/feature/Battle/player/components/AbilityPhase";
import ThemeInputPhase from "@/app/feature/Battle/player/components/ThemeInputPhase";
import AnswerPhase from "@/app/feature/Battle/player/components/AnswerPhase";
import EvaluationPhase from "@/app/feature/Battle/player/components/EvaluationPhase";
import EvaluationResultPhase from "@/app/feature/Battle/player/components/EvaluationResultPhase";
import GameEndPhase from "@/app/feature/Battle/player/components/GameEndPhase";
import useSelectedCard from "@/app/feature/Battle/player/hooks/useSelectedCard";
import { Phase } from "@/app/types/userState/card";

const Player: React.FC = () => {
	const { selectedCardSrcList, selectedCardList, handleChangeCardState } =
		useSelectedCard();
	const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.cardUsagePhase);
	const currentPhaseComponent = (phase: Phase) => {
		switch (phase) {
			case Phase.cardUsagePhase:
				return (
					<CardUsagePhase
						selectedCardSrcList={selectedCardSrcList}
						handleChangeCardState={handleChangeCardState}
						handleChangePhase={setCurrentPhase}
					/>
				);
			case Phase.abilityPhase:
				return (
					<AbilityPhase
						selectedCardList={selectedCardList}
						handleChangePhase={setCurrentPhase}
					/>
				);
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
