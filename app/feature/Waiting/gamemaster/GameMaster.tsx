"use client";

import React, { useCallback, useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import useFetch from "@/app/hooks/useFetch";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import { ClientType } from "@/app/api/types/types";
import Button from "@/app/components/common/Button";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const GameMaster: React.FC = () => {
	const { fetchJoinAsGameMaster, fetchGameStart } = useFetch();
	const [clientId] = useLocalStorage("clientId");
	const { messageState, close } = useWebSocket(
		ClientType.GAME_MASTER,
		clientId ?? "Client id is note set",
	);
	const router = useRouter();

	useEffect(() => {
		fetchJoinAsGameMaster();
		return () => {
			// close();
		};
	}, []);

	const handleGameStart = useCallback(() => {
		fetchGameStart();
		router.push("/battle/gamemaster");
	}, [fetchGameStart, router]);

	const GameStartButton = () => {
		return (
			<Button buttonType="primary" buttonSize="md" onClick={handleGameStart}>
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
				if (Number.parseInt(messageState?.message ?? "0") >= 2) {
					return <GameStartButton />;
				}
				return <></>;
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
