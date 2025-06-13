import { atom, Getter, Setter } from "jotai";
import { CardListType, Phase } from "@/app/types/userState/card";
import cardMock from "@/app/mock/card/card";

export const currentPhaseAtom = atom<Phase>(Phase.cardUsagePhase);
export const cardListAtom = atom<CardListType>(cardMock);
export const handleChangeCardStateAtom = (
	_get: Getter,
	set: Setter,
	cardName: string,
	cardState: boolean,
) => {
	set(cardListAtom, (prev) => {
		return structuredClone(prev).map((card) => {
			if (card.src === cardName) {
				return { ...card, selected: cardState };
			}
			return card;
		});
	});
};

// 回答内容
export const answerAtom = atom<string>("");

// 合計得点
export const totalPointAtom = atom<number>(0);
