"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import { Phase, CardListType } from "@/app/types/userState/card";

type prop = {
	selectedCardList: CardListType;
	handleChangePhase: React.Dispatch<React.SetStateAction<Phase>>;
};

const AbilityPhase: React.FC<prop> = ({
	selectedCardList,
	handleChangePhase,
}) => {
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			handleChangePhase(Phase.themeInputPhase);
		}, 4000);
		return () => clearTimeout(timeoutId);
	});
	console.log(selectedCardList);
	return (
		<Root>
			<Title text={"能力発動！"} />
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
const SelectCardSection = styled("div")(({ theme: _ }) => ({
	bottom: 24,
	display: "flex",
	gap: 24,
	justifyContent: "center",
	position: "absolute",
	width: "100%",
}));
