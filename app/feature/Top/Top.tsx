"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/Common/Title";
import Button from "@/app/components/Common/Button";
import { useRouter } from "next/navigation";

const Top: React.FC = () => {
	const router = useRouter();
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
