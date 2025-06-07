"use client";

import type React from "react";
import type { ReactNode } from "react";
import { styled } from "@mui/system";

type Props = {
	buttonType: "primary" | "secondary" | "tertiary";
	buttonSize: "sm" | "md" | "lg";
	buttonColor?: string;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	children: ReactNode;
};

const Button: React.FC<Props> = ({
	buttonType,
	buttonSize,
	buttonColor,
	disabled = false,
	onClick,
	children,
	className,
}) => {
	return (
		<Root
			buttonType={buttonType}
			buttonSize={buttonSize}
			buttonColor={buttonColor}
			disabled={disabled}
			onClick={onClick}
			className={className}
		>
			{children}
		</Root>
	);
};
export default Button;

const Root = styled("button")<{
	buttonType: Props["buttonType"];
	buttonSize: Props["buttonSize"];
	buttonColor: Props["buttonColor"];
	disabled: boolean;
}>(({ buttonType, buttonSize, buttonColor, disabled }) => ({
	alignItems: "center",
	cursor: disabled ? "none" : "pointer",
	opacity: disabled ? 0.5 : 1,
	padding:
		buttonSize === "sm"
			? "8px 12px"
			: buttonSize === "md"
				? "12px 16px"
				: "16px 24px",
	fontSize:
		buttonSize === "sm" ? "16px" : buttonSize === "md" ? "24px" : "32px",
	border: "none",
	borderRadius: "4px",
	backgroundColor: buttonColor
		? buttonColor
		: buttonType === "primary"
			? "#0070f3"
			: buttonType === "secondary"
				? "#e2e8f0"
				: "transparent",
	color: "#fff",
	transition: "all 0.2s ease-in-out",
	"&:hover": {
		opacity: disabled ? 0.5 : 0.8,
	},
}));
