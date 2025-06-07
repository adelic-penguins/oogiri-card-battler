"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";

const Top: React.FC = () => {
	return (
		<Root>
			<Title text={"大喜利カードバトラー"} />
			<ButtonSection>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => console.log("クリック")}
					buttonColor="#3eadff"
				>
					ゲームマスターとして参加
				</Button>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => console.log("クリック")}
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
