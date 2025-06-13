"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Description from "@/app/components/common/Description";
import { useSetAtom } from "jotai";
import { currentPhaseAtom } from "@/app/state/jotai/atoms";
import { Phase } from "@/app/types/userState/card";

const CardUsagePhase: React.FC = () => {
	const setPhase = useSetAtom(currentPhaseAtom);
	useEffect(() => {
		setTimeout(() => {
			// ここで次のフェーズに遷移する処理を実装
			// 例えば、ルーティングを変更するなど
			setPhase(Phase.themeInputPhase);
		}, 5000); // 5秒後に次のフェーズへ遷移
	}, [setPhase]);

	return (
		<Root>
			<Title text={"カード使用フェーズ"} />
			<Description
				text={"カード使用フェーズが終了するまで\nお待ちください..."}
			/>
		</Root>
	);
};
export default CardUsagePhase;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	display: "flex",
	gap: 64,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));
