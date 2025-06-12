"use client";

import { useState } from "react";
import { CardListType } from "@/app/types/userState/card";
import cardMock from "@/app/mock/card/card";

const useSelectedCard = (): {
	cardSrcList: string[];
	cardStateList: CardListType;
	handleChangeCardState: (cardName: string, cardState: boolean) => void;
} => {
	// TODO: いつかカードをAPI経由で取ってきたい...いつか...
	const [cardStateList, setCardStateList] = useState<CardListType>(cardMock);
	const handleChangeCardState = (cardName: string, cardState: boolean) => {
		setCardStateList((prev) => {
			const newCardStateList = structuredClone(prev).map((card) => {
				if (card.src === cardName) {
					return { ...card, selected: cardState };
				}
				return card;
			});
			return newCardStateList;
		});
	};

	return {
		cardSrcList: cardStateList.map((card) => card.src),
		cardStateList,
		handleChangeCardState,
	};
};
export default useSelectedCard;
