"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Card from "@/app/components/card/Card";
import useAbilityPhase from "@/app/feature/Battle/player/hooks/useAbilityPhase";

const AbilityPhase: React.FC = () => {
	const card = useAbilityPhase();
	return (
		<Root>
			<Title text={"能力発動！"} />
			<ActivationAbilityArea>
				{!!card && (
					<Card
						src={card.src}
						alt={card.src}
						cardName={card.cardName}
						key={card.src}
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
