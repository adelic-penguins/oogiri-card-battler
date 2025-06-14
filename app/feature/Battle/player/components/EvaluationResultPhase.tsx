"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import useEvaluationResultPhase from "../hooks/useEvaluationResultPhase";
import { useSetAtom } from "jotai";
import { currentPhaseAtom, wsMessageStateAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";

const EvaluationResultPhase: React.FC = () => {
	const { evaluationResultText, isLoading } = useEvaluationResultPhase();
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
			<Title text={"判定..."} />
			{isLoading && <Description text={evaluationResultText} />}
		</Root>
	);
};
export default EvaluationResultPhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));
