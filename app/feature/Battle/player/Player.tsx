"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import Card from "@/app/components/card/Card";
import cardMock from "@/app/mock/card/card";
import type { SelectedCardState } from "@/app/types/userState/card";

const Player: React.FC = () => {
	// TODO: いつかカードをAPI経由で取ってきたい...いつか...
	const [selectedCardState, setSelectedCardState] = useState<SelectedCardState>(
		cardMock.reduce((acc, cur) => {
			acc[cur] = false;
			return acc;
		}, {} as SelectedCardState),
	);
	const handleChangeCardState = (cardName: string, cardState: boolean) => {
		setSelectedCardState((prev) => {
			const newSelectedCardState = structuredClone(prev);
			newSelectedCardState[cardName] = cardState;
			return newSelectedCardState;
		});
	};

	useEffect(() => {
		console.log(selectedCardState);
	}, [selectedCardState]);

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
			<SelectCardSection>
				{cardMock.map((item) => {
					console.log(item);
					return (
						<Card
							src={item}
							alt={item}
							cardName={item}
							key={item}
							handleChange={handleChangeCardState}
						/>
					);
				})}
			</SelectCardSection>
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
	position: "relative",
}));
const ButtonSection = styled("div")(({ theme: _ }) => ({
	display: "flex",
	flexFlow: "column",
	gap: 24,
}));
const SelectCardSection = styled("div")(({ theme: _ }) => ({
	bottom: 24,
	display: "flex",
	gap: 24,
	justifyContent: "center",
	position: "absolute",
	width: "100%",
}));
