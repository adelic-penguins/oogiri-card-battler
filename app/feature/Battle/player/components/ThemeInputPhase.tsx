"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import useThemeInputPhase from "../hooks/useThemeInputPhase";

const ThemeInputPhase: React.FC = () => {
	useThemeInputPhase();
	return (
		<Root>
			<Title text={"お題入力フェーズ"} />
			<Description text={"お題入力中..."} />
		</Root>
	);
};
export default ThemeInputPhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));
