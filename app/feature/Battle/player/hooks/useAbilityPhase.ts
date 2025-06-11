"use client";

import { useState } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import { Phase, CardListType } from "@/app/types/userState/card";

const useAbilityPhase = (selectedCardList: CardListType) => {
	const [activationAbilityQueue, setActivationAbilityQueue] =
		useState(selectedCardList);

	useEffect(() => {}, [activationAbilityQueue]);
};
export default useAbilityPhase;
