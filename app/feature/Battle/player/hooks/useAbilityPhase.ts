"use client";

import { useState, useEffect } from "react";
import { Phase, CardType } from "@/app/types/userState/card";
import { useAtomValue, useSetAtom } from "jotai";
import { currentPhaseAtom, cardListAtom } from "@/app/state/jotai/atoms";

const useAbilityPhase = (): CardType | null => {
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const [activationAbilityQueue, setActivationAbilityQueue] = useState(
		useAtomValue(cardListAtom),
	);

	useEffect(() => {
		if (activationAbilityQueue.length === 0) {
			setCurrentPhase(Phase.themeInputPhase);
			return;
		}

		const timer = setTimeout(() => {
			setActivationAbilityQueue((prev) => structuredClone(prev.slice(1)));
		}, 5000);

		return () => clearTimeout(timer);
	}, [activationAbilityQueue, setCurrentPhase]);

	return activationAbilityQueue[0] ?? null;
};
export default useAbilityPhase;
