"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import useFetch from "@/app/hooks/useFetch";
import { useWebSocketForPlayerWaiting } from "@/app/hooks/useWebSocket";

const Player: React.FC = () => {
	const { fetchJoinAsResponder } = useFetch();
	useWebSocketForPlayerWaiting();
	useEffect(() => {
		fetchJoinAsResponder();
	}, [fetchJoinAsResponder]);
	return (
		<Root>
			<Title text={"あなたは回答者です"} />
			<Description text={"参加者を待っています..."} />
		</Root>
	);
};
export default Player;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));
