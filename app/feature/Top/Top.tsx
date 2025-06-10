"use client";

import React, {useEffect} from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import { useRouter } from "next/navigation";
import {useLocalStorage} from "@/app/hooks/useLocalStorage";
import {useUuid} from "@/app/hooks/useUuid";

const Top: React.FC = () => {
	const router = useRouter();
	const [clientId, setClientId] = useLocalStorage("clientId");
	// uuidの取得
	const uuid = useUuid();

	useEffect(() => {
		if(!clientId) {
			setClientId(uuid);
		}
	}, [uuid]);

	return (
		<Root>
			<Title text={"大喜利カードバトラー"} />
			<ButtonSection>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => router.push("/waiting/gamemaster")}
					buttonColor="#3eadff"
				>
					ゲームマスターとして参加
				</Button>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => router.push("/waiting/player")}
					buttonColor="#ffc944"
				>
					回答者として参加
				</Button>
			</ButtonSection>
		</Root>
	);
};
export default Top;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));
const ButtonSection = styled("div")(({ theme: _ }) => ({
	display: "flex",
	flexFlow: "column",
	gap: 24,
}));
