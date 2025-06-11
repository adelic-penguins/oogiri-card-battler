"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import Card from "@/app/components/card/Card";
import { Phase } from "@/app/types/userState/card";

type prop = {
	selectedCardSrcList: string[];
	handleChangeCardState: (cardName: string, cardState: boolean) => void;
	handleChangePhase: React.Dispatch<React.SetStateAction<Phase>>;
};

const CardUsagePhase: React.FC<prop> = ({
	selectedCardSrcList,
	handleChangeCardState,
	handleChangePhase,
}) => {
	return (
		<Root>
			<Title text={"カード使用フェーズ"} />
			<ButtonSection>
				<Button
					buttonType="tertiary"
					buttonSize="md"
					onClick={() => handleChangePhase(Phase.abilityPhase)}
					buttonColor="#3eadff"
				>
					スキップ
				</Button>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => handleChangePhase(Phase.abilityPhase)}
					buttonColor="#ffc944"
				>
					選択されたカードを使用
				</Button>
			</ButtonSection>
			<SelectCardSection>
				{selectedCardSrcList.map((card) => {
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
