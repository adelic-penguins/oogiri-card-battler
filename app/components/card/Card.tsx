import React from "react";
import { styled } from "@mui/system";
import Image from "next/image";
import { useBooleanState } from "@/app/hooks/useBooleanState";

type Props = {
	src: string;
	alt: string;
	cardName: string;
	handleChange?: (cardName: string, cardState: boolean) => void;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Card: React.FC<Props> = ({ src, alt, cardName, handleChange }) => {
	const [cardState, selectCard, unSelectCard, _changeCardState] =
		useBooleanState(false);
	const handleChangeCardState = () => {
		if (!handleChange) return;
		if (cardState) {
			unSelectCard();
		} else {
			selectCard();
		}
		handleChange(cardName, !cardState);
	};
	return (
		<Root onClick={handleChangeCardState}>
			<StyledImage
				alt={alt}
				cardState={cardState}
				height={275}
				src={`${basePath}/images/${src}`}
				style={{ objectFit: "cover" }}
				width={200}
			/>
		</Root>
	);
};
export default Card;

const Root = styled("div")({
	borderRadius: "8px",
	boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
	display: "flex",
	justifyContent: "center",
	padding: 12,
	width: "fit-content",
});
const StyledImage = styled(Image, {
	shouldForwardProp: (prop) => prop !== "cardState",
})<{ cardState: boolean }>(({ cardState }) => ({
	border: cardState ? "4px solid #ff0000" : "4px solid transparent",
	borderRadius: "8px",
}));
