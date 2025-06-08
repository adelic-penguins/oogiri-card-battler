import type React from "react";
import { styled } from "@mui/system";

type Props = {
	setText: (value: string) => void;
	text: string;
};

const InputArea: React.FC<Props> = ({ text, setText }) => {
	return (
		<Root type="text" value={text} onChange={(e) => setText(e.target.value)} />
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
	"&:focus": {
		borderColor: "#0070f3",
	},
});
