"use client";
import { BRAND_COLOR_KEY, THEME_KEY } from "@/constants/app-config";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeModeContextType = {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  brandColor?: string;
  setBrandColor: (color: string) => void;
};

const ThemeModeContext = createContext<ThemeModeContextType>({
  theme: "light",
  setTheme: () => {},
  brandColor: "#456BF2",
  setBrandColor: () => {},
});

type Theme = "dark" | "light";

const getDOMTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
};

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme>(getDOMTheme);
  const [brandColor, setBrandColor] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.removeAttribute("data-theme");
      root.style.colorScheme = "light";
    }
    const expires = new Date("9999-12-31").toUTCString();
    document.cookie = `${THEME_KEY}=${theme}; path=/; expires=${expires}; samesite=lax`;
    setReady(true);
  }, [theme]);

  useEffect(() => {
    const brand = localStorage.getItem(BRAND_COLOR_KEY);
    if (!brand) {
      setBrandColor("#456BF2");
      localStorage.setItem(BRAND_COLOR_KEY, "#456BF2");
    } else {
      setBrandColor(brand);
    }
  }, []);

  const themeChangeHandler = (theme: Theme) => {
    setTheme(theme);
  };

  const brandColorHandler = (color: string) => {
    setBrandColor(color);
    localStorage.setItem(BRAND_COLOR_KEY, color);
  };

  const isReady = ready && brandColor;

  return (
    <ThemeModeContext.Provider
      value={{
        theme,
        setTheme: themeChangeHandler,
        brandColor: brandColor!,
        setBrandColor: brandColorHandler,
      }}
    >
      {isReady && children}
      {!isReady && (
        <div className="flex h-dvh w-dvw items-center justify-center">
          <Image src="/brand/treffix-logo.png" width={180} height={52} alt="Treffix Logo" />
        </div>
      )}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};
