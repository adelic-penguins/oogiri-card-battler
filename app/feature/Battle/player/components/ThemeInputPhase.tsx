"use client";

import React, { useCallback } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import InputArea from "@/app/components/common/InputArea";
import { useSetAtom } from "jotai";
import { useAtom } from "jotai";
import { answerAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";

const ThemeInputPhase: React.FC = () => {
	const [answer, setAnswer] = useAtom(answerAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);

	const checkInputFilled = useCallback(() => {
		if (!answer) {
			alert("回答を入力してくれ。逃げるな。");
			return;
		}
		setCurrentPhase(Phase.answerPhase);
	}, [answer]);

	return (
		<Root>
			<Title text={"お題回答"} />
			<InputArea
				value={answer}
				onChange={setAnswer}
				placeholder={"入力中..."}
			/>
			<Button buttonType="primary" buttonSize="md" onClick={checkInputFilled}>
				送信
			</Button>
		</Root>
	);
};
export default ThemeInputPhase;

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
