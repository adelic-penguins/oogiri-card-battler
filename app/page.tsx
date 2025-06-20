import React from "react";
import Top from "@/app/feature/Top/Top";
import { useUuid } from "@/app/hooks/useUuid";

const TopPage: React.FC = () => {
	const uuid = useUuid();
	return <Top clientId={uuid} />;
};
export default TopPage;
