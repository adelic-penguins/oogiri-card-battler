"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import { useWebSocketForGameMasterAnswerInputPhase } from "@/app/hooks/useWebSocket";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/app/state/jotai/atoms";

const AnswerPhase: React.FC = () => {
	const theme = useAtomValue(themeAtom);
	useWebSocketForGameMasterAnswerInputPhase();

	return (
		<Root>
			<Title text={"ゲームスタート！"} />
			<Description text={theme} />
		</Root>
	);
};
export default AnswerPhase;

const Root = styled("div")(() => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));
