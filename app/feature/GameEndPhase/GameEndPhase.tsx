"use client";

import React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import Description from "@/app/components/common/Description";
import { useRouter } from "next/navigation";
import { wsStateAtom } from "@/app/state/jotai/atoms";
import { useAtomValue } from "jotai";

const GameEndPhase: React.FC = () => {
    const router = useRouter();
	const wsState = useAtomValue(wsStateAtom);
	return (
		<Root>
			<Title text={"終了！"} />
			<Description text={"判定　Ａ　の勝ち"} />
			<ButtonArea>
				<TopButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#5fd97a"
					textColor="#222"
					onClick={() => {
						wsState.close();
						router.push("/");
					}}
				>
					トップへ戻る
				</TopButton>
			</ButtonArea>
		</Root>
	);
};
export default GameEndPhase;

const Root = styled("div")(() => ({
	alignItems: "center",
	display: "flex",
	gap: 32,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
}));

const ButtonArea = styled("div")(() => ({
	display: "flex",
	gap: 40,
	marginTop: 40,
}));

const TopButton = styled(Button)<{ textColor?: string }>(({ textColor }) => ({
	width: 180,
	fontSize: 20,
	fontWeight: 400,
	border: "none",
	boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
	color: textColor || undefined,
}));
