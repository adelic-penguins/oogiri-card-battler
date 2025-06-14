"use client";

import React, { useCallback, useState } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import Button from "@/app/components/common/Button";
import InputArea from "@/app/components/common/InputArea";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { answerAtom, themeAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";
import useFetch from "@/app/hooks/useFetch";

const AnswerPhase: React.FC = () => {
	const setAnswer = useSetAtom(answerAtom);
	const [inputText, setInputText] = useAtom(answerAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
	const theme = useAtomValue(themeAtom);
	const { fetchRespondTheme } = useFetch();

	const checkInputFilled = useCallback(async () => {
		if (!inputText) {
			alert("回答を入力してくれ。逃げるな。");
			return;
		}
		setAnswer(inputText);
		const { message } = await fetchRespondTheme(inputText);
		if (!message) setCurrentPhase(Phase.evaluationPhase);
	}, [inputText, setAnswer, setCurrentPhase, fetchRespondTheme]);

	return (
		<Root>
			<Title text={"お題回答"} />
			<Description text={theme} />
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
