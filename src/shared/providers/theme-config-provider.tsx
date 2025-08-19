"use client";

import { useThemeMode } from "@/shared/providers/theme-mode-provider";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { AliasToken } from "antd/es/theme/internal";
import { useLayoutEffect, useMemo } from "react";

const tokenColors: Record<string, Partial<AliasToken>> = {
  light: {
    colorBgBase: "#ffffff",
  },
  dark: {
    colorBgBase: "#000000",
    colorBgElevated: "#17191d",
  },
};

const ThemeConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, brandColor } = useThemeMode();

  const tokenDefault = useMemo<Partial<AliasToken>>(() => {
    return {
      colorPrimary: brandColor || "#456BF2",
      colorInfo: brandColor || "#456BF2",
      colorSuccess: "#52c41a",
      colorWarning: "#faad14",
      colorError: "#ff4d4f",
      fontFamily: "'Poppins', sans-serif",
    };
  }, [brandColor]);

  useLayoutEffect(() => {
    document.body.style.setProperty("--theme-color-primary", tokenDefault?.colorPrimary || "");
    document.body.style.setProperty("--theme-color-info", tokenDefault?.colorInfo || "");
    document.body.style.setProperty("--theme-color-success", tokenDefault?.colorSuccess || "");
    document.body.style.setProperty("--theme-color-error", tokenDefault?.colorError || "");
  }, [
    theme,
    tokenDefault?.colorPrimary,
    tokenDefault?.colorInfo,
    tokenDefault?.colorSuccess,
    tokenDefault?.colorError,
  ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          ...tokenDefault,
          ...tokenColors[theme],
        },
        algorithm: theme === "light" ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
      }}
      componentSize="large"
    >
      <div>{children}</div>
    </ConfigProvider>
  );
};

export default ThemeConfigProvider;
