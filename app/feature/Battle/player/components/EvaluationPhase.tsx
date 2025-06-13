"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import { useAtomValue } from "jotai";
import { answerAtom } from "@/app/state/jotai/atoms";
import useEvaluationPhase from "@/app/feature/Battle/player/hooks/useEvaluationPhase";

const EvaluationPhase: React.FC = () => {
	const answer = useAtomValue(answerAtom);
	useEvaluationPhase();

	return (
		<Root>
			<Title text={"回答"} />
			<Description text={answer} />
		</Root>
	);
};
export default EvaluationPhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));
