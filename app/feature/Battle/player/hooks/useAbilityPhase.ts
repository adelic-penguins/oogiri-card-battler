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
	const [activationAbilityCard, setActivationAbilityCard] =
		useState<CardType | null>(null);

	useEffect(() => {
		console.log("activationAbilityQueue", activationAbilityQueue);
		console.log("activationAbilityCard", activationAbilityCard);
		if (activationAbilityQueue.length === 0 && activationAbilityCard) {
			handleChangePhase(Phase.themeInputPhase);
			return;
		}

		(async () => {
			setActivationAbilityCard(activationAbilityQueue[0]);

			// 5秒間カードの効果を画面に表示する
			await new Promise((resolve) => setTimeout(resolve, 5000));

			setActivationAbilityQueue((prev) => {
				const newActivationAbilityQueue = structuredClone(prev.slice(1));
				return newActivationAbilityQueue;
			});
			setActivationAbilityCard(null);
		})();
	}, [activationAbilityQueue, activationAbilityCard]);

	return activationAbilityCard;
};
export default useAbilityPhase;
