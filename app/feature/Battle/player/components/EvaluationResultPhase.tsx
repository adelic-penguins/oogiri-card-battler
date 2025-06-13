"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import useEvaluationResultPhase from "../hooks/useEvaluationResultPhase";

const EvaluationResultPhase: React.FC = () => {
	const { evaluationResult, isLoading } = useEvaluationResultPhase();

	return (
		<Root>
			<Title text={"判定..."} />
			{isLoading && <Description text={evaluationResult} />}
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
