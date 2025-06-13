"use client";

import React, { useCallback, useState } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import Button from "@/app/components/common/Button";
import InputArea from "@/app/components/common/InputArea";
import { useSetAtom } from "jotai";
import { answerAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";

const AnswerPhase: React.FC = () => {
	const setAnswer = useSetAtom(answerAtom);
	const [inputText, setInputText] = useState("");
	const setCurrentPhase = useSetAtom(currentPhaseAtom);

	const checkInputFilled = useCallback(() => {
		if (!inputText) {
			alert("回答を入力してくれ。逃げるな。");
			return;
		}
		setAnswer(inputText);
		setCurrentPhase(Phase.evaluationPhase);
	}, [inputText]);

	return (
		<Root>
			<Title text={"お題回答"} />
			<Description text={"こんなドラえもんは嫌だ"} />
			<InputArea
				value={inputText}
				onChange={setInputText}
				placeholder={"入力中..."}
			/>
			<Button buttonType="primary" buttonSize="md" onClick={checkInputFilled}>
				送信
			</Button>
		</Root>
	);
};
export default AnswerPhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));
