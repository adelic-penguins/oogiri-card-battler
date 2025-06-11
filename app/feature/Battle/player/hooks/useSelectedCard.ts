"use client";

import { useEffect, useState } from "react";
import { CardListType } from "@/app/types/userState/card";
import cardMock from "@/app/mock/card/card";

const useSelectedCard = (): {
	selectedCardList: string[];
	handleChangeCardState: (cardName: string, cardState: boolean) => void;
} => {
	// TODO: いつかカードをAPI経由で取ってきたい...いつか...
	const [selectedCardState, setSelectedCardState] =
		useState<CardListType>(cardMock);
	const handleChangeCardState = (cardName: string, cardState: boolean) => {
		setSelectedCardState((prev) => {
			const newSelectedCardState = structuredClone(prev).map((card) => {
				if (card.src === cardName) {
					return { ...card, selected: cardState };
				}
				return card;
			});
			return newSelectedCardState;
		});
	};

	useEffect(() => {
		console.log("selectedCardState", selectedCardState);
	}, [selectedCardState]);

	return {
		selectedCardList: selectedCardState.map((card) => card.src),
		handleChangeCardState,
	};
};
export default useSelectedCard;
