"use client";

import React, {useCallback, useEffect} from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import { useRouter } from "next/navigation";
import Description from "@/app/components/common/Description";
import useFetch from "@/app/hooks/useFetch";
import {ClientMessage, ClientType} from "@/app/api/types/types";
import {useWebSocket} from "@/app/hooks/useWebSocket";
import {useLocalStorage} from "@/app/hooks/useLocalStorage";

const Player: React.FC = () => {
	const router = useRouter();
	const { fetchJoinAsResponder } = useFetch();
	const [clientId, setClientId] = useLocalStorage("clientId");
	const handleChangeWs = useCallback((data: ClientMessage) => {
		if (data.message) {
			if (data.type === "start_game") {
				router.push("/battle/player");
			}
		}
	},[]);
	const { messageState } = useWebSocket(ClientType.RESPONDENT, clientId ?? "Client id not found.", handleChangeWs);
	useEffect(() => {
		fetchJoinAsResponder();
	}, []);
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
