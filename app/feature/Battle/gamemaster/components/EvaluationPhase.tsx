"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import Button from "@/app/components/common/Button";
import { useSetAtom } from "jotai";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";

const EvaluationPhase: React.FC = () => {
	const setPhase = useSetAtom(currentPhaseAtom);
	useEffect(() => {
		setTimeout(() => {
			// ここで次のフェーズに遷移する処理を実装
			// 例えば、ルーティングを変更するなど
			setPhase(Phase.evaluationResultPhase);
		}, 5000); // 5秒後に次のフェーズへ遷移
	}, [setPhase]);

	return (
		<Root>
			<Title text={"ゲームスタート！"} />
			<Description text={"こんなドラえもんは嫌だ"} />
			<AnswerText>手が5本生えている</AnswerText>
			<ButtonArea>
				<EvalButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#f44321"
					textColor="#fff"
				>
					failed
				</EvalButton>
				<EvalButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#5fd97a"
					textColor="#222"
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
