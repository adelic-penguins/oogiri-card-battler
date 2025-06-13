"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/common/Title";
import Button from "@/app/components/common/Button";
import { useRouter } from "next/navigation";

const EvaluationResultPhase: React.FC = () => {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			// ここで次のフェーズに遷移する処理を実装
			// 例えば、ルーティングを変更するなど
			router.push("/game-end-phase");
		}, 5000); // 5秒後に次のフェーズへ遷移
	}, [router]);
	return (
		<Root>
			<Title text={"ゲームスタート！"} />
			<ThemeText>こんなドラえもんは嫌だ</ThemeText>
			<ButtonArea>
				<NoPointButton
					buttonType="primary"
					buttonSize="md"
					buttonColor="#f44321"
				>
					no point...
				</NoPointButton>
			</ButtonArea>
		</Root>
	);
};
export default EvaluationResultPhase;

const Root = styled("div")(() => ({
	alignItems: "center",
	display: "flex",
	gap: 24,
	flexFlow: "column",
	height: "100%",
	justifyContent: "center",
	position: "relative",
}));

const ThemeText = styled("div")(() => ({
	fontSize: 20,
	margin: "32px 0 0 0",
}));

const ButtonArea = styled("div")(() => ({
	display: "flex",
	gap: 40,
	marginTop: 40,
}));

const NoPointButton = styled(Button)({
	width: 180,
	fontSize: 20,
	fontWeight: 400,
	border: "none",
	boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
	color: "#fff",
});
