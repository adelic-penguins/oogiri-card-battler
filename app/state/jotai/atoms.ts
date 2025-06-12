import {atom, Getter, Setter} from 'jotai';
import {CardListType, Phase} from "@/app/types/userState/card";
import cardMock from "@/app/mock/card/card";

export const currentPhaseAtom = atom<Phase>(Phase.cardUsagePhase);
export const selectedCardListAtom = atom<CardListType>(cardMock);
export const handleChangeCardStateAtom = (get: Getter, set: Setter, cardName: string, cardState: boolean) => {
        set(selectedCardListAtom, prev => {
            return structuredClone(prev).map((card) => {
                if (card.src === cardName) {
                    return {...card, selected: cardState};
                }
                return card;
            });
        });
    };