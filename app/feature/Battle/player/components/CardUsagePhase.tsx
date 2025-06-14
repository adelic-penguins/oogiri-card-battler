"use client";

import React, { useCallback } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import Card from "@/app/components/card/Card";
import { Phase } from "@/app/types/userState/card";
import { useAtomValue, useSetAtom } from "jotai";
import {
	currentPhaseAtom,
	handleChangeCardStateAtom,
	cardListAtom,
} from "@/app/state/jotai/atoms";
import { useAtomCallback } from "jotai/utils";

const CardUsagePhase: React.FC = () => {
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const cardList = useAtomValue(cardListAtom);
	const handleChangeCardState = useAtomCallback(
		useCallback(handleChangeCardStateAtom, []),
	);
	return (
		<Root>
			<Title text={"カード使用フェーズ"} />
			<ButtonSection>
				<Button
					buttonType="tertiary"
					buttonSize="md"
					onClick={() => setCurrentPhase(Phase.abilityPhase)}
					buttonColor="#3eadff"
				>
					スキップ
				</Button>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => setCurrentPhase(Phase.abilityPhase)}
					buttonColor="#ffc944"
				>
					選択されたカードを使用
				</Button>
			</ButtonSection>
			<SelectCardSection>
				{cardList
					.map((card) => card.src)
					.map((card) => {
						return (
							<Card
								src={card}
								alt={card}
								cardName={card}
								key={card}
								handleChange={handleChangeCardState}
							/>
						);
					})}
			</SelectCardSection>
		</Root>
	);
};
export default CardUsagePhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 32,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));
const ButtonSection = styled("div")(({ theme: _ }) => ({
	display: "flex",
	flexFlow: "column",
	gap: 24,
}));
const SelectCardSection = styled("div")(({ theme: _ }) => ({
	display: "flex",
	gap: 24,
	justifyContent: "center",
	width: "100%",
}));
