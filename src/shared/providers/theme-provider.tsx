"use client";

import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#f5222d",
    colorInfo: "#f5222d",
  },
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};

export default ThemeProvider;
