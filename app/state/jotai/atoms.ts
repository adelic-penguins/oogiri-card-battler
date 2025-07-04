import { atom, Getter, Setter } from "jotai";
import { CardListType, Phase } from "@/app/types/userState/card";
import cardMock from "@/app/mock/card/card";
import { ClientMessage } from "@/app/api/types/types";

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

// お題
export const themeAtom = atom<string>("");

// 評価結果
export const evaluationResultAtom = atom<string>("");

// websocket関連
export const wsMessageStateAtom = atom<ClientMessage>({
	type: "",
	message: "",
});

let ws: WebSocket | null = null;
export const wsStateAtom = atom(() => {
	if (!ws) {
		ws = new WebSocket(
			`${process.env.NEXT_PUBLIC_WS_SERVER_URL || "http://localhost:3010"}/client`,
		);
	}
	return ws;
});