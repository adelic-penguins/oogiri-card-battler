"use client";

import type React from "react";
import { styled } from "@mui/system";
import Title from "@/app/components/Common/Title";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Description from "@/app/components/Common/Description";

const Player: React.FC = () => {
	const router = useRouter();
	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/battle/player");
		}, 4000);
		return () => clearTimeout(timer);
	}, [router]);
	return (
		<Root>
			<Title text={"あなたは回答者です"} />
			<Description text={"参加者を待っています..."} />
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
