import React from "react";
import { styled } from "@mui/system";

type Props = {
	text: string;
};

const Description: React.FC<Props> = ({ text }) => {
	return <Root>{text}</Root>;
};
export default Description;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	fontSize: 16,
}));
