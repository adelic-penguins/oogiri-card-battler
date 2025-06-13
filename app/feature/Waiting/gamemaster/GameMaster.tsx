"use client";

import React, { useCallback, useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import useFetch from "@/app/hooks/useFetch";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import { ClientMessage, ClientType } from "@/app/api/types/types";
import Button from "@/app/components/common/Button";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const GameMaster: React.FC = () => {
	const { fetchJoinAsGameMaster, fetchGameStart } = useFetch();
	const [clientId, setClientId] = useLocalStorage("clientId");
	const { messageState, close } = useWebSocket(
		ClientType.GAME_MASTER,
		clientId ?? "Client id is note set",
	);

	useEffect(() => {
		fetchJoinAsGameMaster();
		return () => {
			close();
		};
	}, []);

	const GameStartButton = () => {
		return (
			<Button
				buttonType="primary"
				buttonSize="md"
				onClick={() => fetchGameStart()}
			>
				ゲームスタート！
			</Button>
		);
	};

	return (
		<Root>
			<Title text={"あなたはゲームマスターです"} />
			<Description
				text={`現在の参加者は${messageState?.message ?? "0"}人です`}
			/>
			{(() => {
				if (parseInt(messageState?.message ?? "0") >= 2) {
					return <GameStartButton />;
				} else {
					return <></>;
				}
			})()}
		</Root>
	);
};
export default GameMaster;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));
