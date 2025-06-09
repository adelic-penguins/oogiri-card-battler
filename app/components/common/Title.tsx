import React from "react";
import { styled } from "@mui/system";

type Props = {
	text: string;
};

const Title: React.FC<Props> = ({ text }) => {
	return <Root>{text}</Root>;
};
export default Title;

const Root = styled("div")(({ theme: _ }) => ({
	alignItems: "center",
	fontSize: 36,
}));
