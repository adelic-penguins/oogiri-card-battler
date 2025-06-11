"use client";

import React from "react";
import { styled } from "@mui/system";

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

const InputArea: React.FC<Props> = ({
	value,
	onChange,
	placeholder,
	disabled = false,
	className,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<Root
			type="text"
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			disabled={disabled}
			className={className}
		/>
	);
};

export default InputArea;

const Root = styled("input")({
	padding: "8px 12px",
	fontSize: "14px",
	border: "1px solid #ccc",
	borderRadius: "4px",
	outline: "none",
	width: "100%",
	boxSizing: "border-box",
	"&:focus": {
		borderColor: "#0070f3",
	},
	"&:disabled": {
		backgroundColor: "#f5f5f5",
		cursor: "not-allowed",
	},
});
