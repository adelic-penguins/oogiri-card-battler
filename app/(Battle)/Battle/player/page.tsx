"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/Common/Title";
import Button from "@/app/components/Common/Button";

const Player: React.FC = () => {
	return (
		<Root>
			<Title text={"カード使用フェーズ"} />
			<ButtonSection>
				<Button
					buttonType="tertiary"
					buttonSize="md"
					onClick={() => console.log("クリック")}
					buttonColor="#3eadff"
				>
					スキップ
				</Button>
				<Button
					buttonType="primary"
					buttonSize="md"
					onClick={() => console.log("クリック")}
					buttonColor="#ffc944"
				>
					選択されたカードを使用
				</Button>
			</ButtonSection>
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
const ButtonSection = styled("div")(({ theme: _ }) => ({
	display: "flex",
	flexFlow: "column",
	gap: 24,
}));
