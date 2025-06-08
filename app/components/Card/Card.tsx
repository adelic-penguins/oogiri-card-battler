import type React from "react";
import { styled } from "@mui/system";
import Image from "next/image";

type Props = {
	path: string;
};

const Card: React.FC<Props> = ({ path }) => {
	return <Root src={path} width={300} height={200} alt="カード" />;
};
export default Card;

const Root = styled(Image)(({ theme: _ }) => ({}));
