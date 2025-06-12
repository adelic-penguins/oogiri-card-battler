"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Card from "@/app/components/card/Card";
import useAbilityPhase from "@/app/feature/Battle/player/hooks/useAbilityPhase";
import { Phase, CardListType } from "@/app/types/userState/card";

type prop = {
	cardStateList: CardListType;
	handleChangePhase: React.Dispatch<React.SetStateAction<Phase>>;
};
const AbilityPhase: React.FC<prop> = ({ cardStateList, handleChangePhase }) => {
	const activationAbilityCard = useAbilityPhase(
		cardStateList,
		handleChangePhase,
	);
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			handleChangePhase(Phase.themeInputPhase);
		}, 4000);
		return () => clearTimeout(timeoutId);
	});
	return (
		<Root>
			<Title text={"能力発動！"} />
			<ActivationAbilityArea>
				{!!activationAbilityCard && (
					<Card
						src={activationAbilityCard.src}
						alt={activationAbilityCard.src}
						cardName={activationAbilityCard.cardName}
						key={activationAbilityCard.src}
					/>
				)}
			</ActivationAbilityArea>
		</Root>
	);
};
export default AbilityPhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));
const ActivationAbilityArea = styled("div")(({ theme: _ }) => ({
	width: 100,
}));
