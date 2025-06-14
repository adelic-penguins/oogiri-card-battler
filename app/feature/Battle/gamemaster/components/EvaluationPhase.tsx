"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import Button from "@/app/components/common/Button";
import useFetch from "@/app/hooks/useFetch";
import { answerAtom, currentPhaseAtom, evaluationResultAtom, themeAtom } from "@/app/state/jotai/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { Phase } from "@/app/types/userState/card";

const EvaluationPhase: React.FC = () => {

	const { fetchEvaluate } = useFetch();
	const answer = useAtomValue(answerAtom);
	const theme = useAtomValue(themeAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const setEvaluationResult = useSetAtom(evaluationResultAtom);

	const handleFailedClick = () => {
		fetchEvaluate("failed");
		setCurrentPhase(Phase.evaluationResultPhase);
		setEvaluationResult("failed");
	};
	const handleSuccessClick = () => {
		fetchEvaluate("success");
		setCurrentPhase(Phase.evaluationResultPhase);
		setEvaluationResult("success");
	};

	useEffect(() => {
		console.log("Evaluation Phase");
	}
	, []);

	return (
		<Root>
			<Title text={"ゲームスタート！"} />
			<Description text={theme} />
			<AnswerText>{answer}</AnswerText>
			<ButtonArea>
				<EvalButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#f44321"
					textColor="#fff"
					onClick={handleFailedClick}
				>
					failed
				</EvalButton>
				<EvalButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#5fd97a"
					textColor="#222"
					onClick={handleSuccessClick}
				>
					success
				</EvalButton>
			</ButtonArea>
		</Root>
	);
};
export default EvaluationPhase;

const Root = styled("div")(() => ({
	alignItems: "center",
	display: "flex",
	gap: 32,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));

const AnswerText = styled("div")(() => ({
	fontSize: 28,
	margin: "32px 0 0 0",
}));

const ButtonArea = styled("div")(() => ({
	display: "flex",
	gap: 40,
	marginTop: 40,
}));

const EvalButton = styled(Button)<{ textColor?: string }>(({ textColor }) => ({
	width: 180,
	fontSize: 24,
	fontWeight: 400,
	border: "none",
	boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
	color: textColor || undefined,
}));
