"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";

const GameMaster: React.FC = () => {
	return (
		<Root>
			<Title text={"カード使用フェーズ"} />
			<Description
				text={"カード使用フェーズが終了するまでしばらくお待ちください..."}
			/>
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
