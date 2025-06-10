"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import { useRouter } from "next/navigation";
import {useLocalStorage} from "@/app/hooks/useLocalStorage";

const Top: React.FC<{ clientId?: string; }> = (props) => {
	const router = useRouter();
	const [clientId, setClientId] = useLocalStorage("clientId", props.clientId);
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
