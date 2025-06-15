import type { NextConfig } from "next";
import config from "dotenv";

config.config();

const nextConfig: NextConfig = {
	output: "standalone",
	basePath: process.env.BASE_PATH || "",
};

export default nextConfig;
