"use client";

import { useState, useEffect } from "react";
import { Phase, CardType } from "@/app/types/userState/card";
import { useAtomValue, useSetAtom } from "jotai";
import { currentPhaseAtom, cardListAtom } from "@/app/state/jotai/atoms";
import useFetch from "@/app/hooks/useFetch";

const useAbilityPhase = (): CardType | null => {
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const { fetchSelectCard } = useFetch();
	const [activationAbilityQueue, setActivationAbilityQueue] = useState(
		useAtomValue(cardListAtom).filter((card) => card.selected),
	);

	useEffect(() => {
		if (activationAbilityQueue.length === 0) {
			fetchSelectCard();
			setCurrentPhase(Phase.themeInputPhase);
			return;
		}

		const timeoutId = setTimeout(() => {
			setActivationAbilityQueue((prev) => structuredClone(prev.slice(1)));
		}, 5000);

		return () => clearTimeout(timeoutId);
	}, [activationAbilityQueue, setCurrentPhase, fetchSelectCard]);

	return activationAbilityQueue[0] ?? null;
};
export default useAbilityPhase;
