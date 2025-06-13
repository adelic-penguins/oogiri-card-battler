"use client";

import { useState, useEffect } from "react";
import { Phase, CardListType, CardType } from "@/app/types/userState/card";

const useAbilityPhase = (
	cardStateList: CardListType,
	handleChangePhase: React.Dispatch<React.SetStateAction<Phase>>,
): CardType | null => {
	const [activationAbilityQueue, setActivationAbilityQueue] = useState(
		cardStateList.filter((card) => card.selected),
	);

	useEffect(() => {
		if (activationAbilityQueue.length === 0) {
			handleChangePhase(Phase.themeInputPhase);
			return;
		}

		const timer = setTimeout(() => {
			setActivationAbilityQueue((prev) => structuredClone(prev.slice(1)));
		}, 5000);

		return () => clearTimeout(timer);
	}, [activationAbilityQueue, handleChangePhase]);

	return activationAbilityQueue[0] ?? null;
};
export default useAbilityPhase;
