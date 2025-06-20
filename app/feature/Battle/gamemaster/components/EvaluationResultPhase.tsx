"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import { useAtomValue, useSetAtom } from "jotai";
import {
	currentPhaseAtom,
	evaluationResultAtom,
	themeAtom,
	wsMessageStateAtom,
} from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";

const EvaluationResultPhase: React.FC = () => {
	const theme = useAtomValue(themeAtom);
	const evaluationResult = useAtomValue(evaluationResultAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const setWsMessage = useSetAtom(wsMessageStateAtom);

	useEffect(() => {
		setTimeout(() => {
			setWsMessage({
				type: "",
				message: "",
			});
			setCurrentPhase(Phase.answerPhase);
		}, 5000);
	}, [setCurrentPhase, setWsMessage]);

	return (
		<Root>
			<Title text={"ゲームスタート！"} />
			<ThemeText>{theme}</ThemeText>
			<ButtonArea>
				<NoPointButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#f44321"
				>
					{evaluationResult === "failed" ? "No Point" : "1 Point"}
				</NoPointButton>
			</ButtonArea>
		</Root>
	);
};
export default EvaluationResultPhase;

const Root = styled("div")(() => ({
	alignItems: "center",
	display: "flex",
	gap: 24,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));

const ThemeText = styled("div")(() => ({
	fontSize: 20,
	margin: "32px 0 0 0",
}));

const ButtonArea = styled("div")(() => ({
	display: "flex",
	gap: 40,
	marginTop: 40,
}));

const NoPointButton = styled(Button)({
	width: 180,
	fontSize: 20,
	fontWeight: 400,
	border: "none",
	boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
	color: "#fff",
});
