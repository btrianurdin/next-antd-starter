import type { NextConfig } from "next";
import withRspack from "next-rspack";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["antd", "dayjs"],
  },
  /* config options here */
};

export default withRspack(nextConfig);
