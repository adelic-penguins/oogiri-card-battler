"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import { useWebSocketForGameMasterCardUsagePhase } from "@/app/hooks/useWebSocket";

const CardUsagePhase: React.FC = () => {
	useWebSocketForGameMasterCardUsagePhase();

	return (
		<Root>
			<Title text={"カード使用フェーズ"} />
			<Description
				text={"カード使用フェーズが終了するまで\nお待ちください..."}
			/>
		</Root>
	);
};
export default CardUsagePhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));
