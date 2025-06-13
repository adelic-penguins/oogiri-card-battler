"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import InputArea from "@/app/components/common/InputArea";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";

const ThemeInputPhase: React.FC = () => {
	const [theme, setTheme] = useState("");

	const handleInputChange = (value: string) => {
		setTheme(value);
	};

	const handleSubmit = () => {
		// ここでテーマ送信処理を実装
		setTheme("");
	};

	const setPhase = useSetAtom(currentPhaseAtom);
	useEffect(() => {
		setTimeout(() => {
			// ここで次のフェーズに遷移する処理を実装
			// 例えば、ルーティングを変更するなど
			setPhase(Phase.answerPhase);
		}, 5000); // 5秒後に次のフェーズへ遷移
	}, [setPhase]);

	return (
		<Root>
			<Title text={"お題入力フェーズ"} />
			<InputWrapper>
				<InputArea
					value={theme}
					onChange={handleInputChange}
					placeholder="お題を入力"
				/>
				<SendButton
					buttonType="primary"
					buttonSize="md"
					onClick={handleSubmit}
					disabled={!theme}
				>
					送信
				</SendButton>
			</InputWrapper>
		</Root>
	);
};
export default ThemeInputPhase;

const Root = styled("div")(() => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));

const InputWrapper = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: 24,
}));

const SendButton = styled(Button)(() => ({
	marginTop: 16,
	width: 120,
	fontSize: 20,
	color: "#3bb3ff",
	background: "none",
	border: "none",
	cursor: "pointer",
	"&:disabled": {
		color: "#b3e0ff",
		cursor: "not-allowed",
	},
}));
