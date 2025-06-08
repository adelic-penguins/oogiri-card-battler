"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";

const GameMaster: React.FC = () => {
	return (
		<Root>
			<Title text={"あなたはゲームマスターです"} />
			<Description text={"現在の参加者は0人です"} />
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
