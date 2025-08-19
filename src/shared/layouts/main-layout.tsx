"use client";

import { sidebarLinks } from "@/constants/navigations";
import { Home05Filled, IDFlag, USFlag } from "@/shared/components/icons";
import { useThemeMode } from "@/shared/providers/theme-mode-provider";
import { Button } from "@/shared/ui/button";
import { ColorPicker } from "@/shared/ui/color-picker";
import { Popover } from "@/shared/ui/popover";
import { cx, hexToRgba, matchPathPattern } from "@/shared/utils";
import { Bell01, ChevronDown, ChevronLeft, Moon01, Sun } from "@untitled-ui/icons-react";
import Input from "antd/es/input/Input";
import useToken from "antd/es/theme/useToken";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [, token] = useToken();
  const pathname = usePathname();

  // Function to check if a menu is active
  const isMenuActive = (link: any): boolean => {
    // If link has direct href, check if it matches current pathname
    if (link.href) {
      return pathname === link.href;
    }

    // If link has children (like Settings), check if any child is active
    if (link.children && link.children.length > 0) {
      return link.children.some((child: any) => child.href && pathname === child.href);
    }

    return false;
  };

  return (
    <div>
      <div className="bg-tx-bg-elevated fixed h-dvh w-[278px] p-5">
        <Link href="/" className="block py-2">
          <Image src="/brand/treffix-logo.png" width={185} height={54} alt="Treffix Logo" />
        </Link>
        <nav className="mt-10 flex flex-col gap-3">
          {sidebarLinks.map(link => {
            const isActive = isMenuActive(link);
            const DefaultIcon = link.icon || Home05Filled;
            const FilledIcon = link.filledIcon || Home05Filled;

            return (
              <Link
                href={link.href || "#"}
                key={link.label}
                className={cx(
                  "text-tx-text-400 flex items-center gap-2 rounded-lg px-3 py-3.5 text-sm font-medium transition-colors duration-300",
                  {
                    "text-tx-primary bg-tx-primary/20 hover:bg-tx-primary/30 font-bold": isActive,
                    "hover:bg-tx-secondary/30": !isActive,
                  }
                )}
              >
                {isActive ? (
                  <FilledIcon
                    fillColor={"color-mix(in oklab, var(--theme-color-primary) 20%, transparent)"}
                  />
                ) : (
                  <DefaultIcon />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="ml-[278px]">
        <TopBarMenu />
        {children}
      </div>
    </div>
  );
};

const TopBarMenu = () => {
  const { theme, setTheme, brandColor, setBrandColor } = useThemeMode();

  return (
    <div className="bg-tx-bg-elevated shadow-tx-base flex items-center px-6 py-4">
      <button>
        <ChevronLeft />
      </button>
      <div className="ml-auto flex items-center gap-6">
        <Popover
          content={
            <div className="text-tx-text-primary w-[260px] p-2">
              <p className="mb-4 text-base font-semibold">Theme Customization</p>
              <div className="mb-6">
                <p className="mb-2">Theme</p>
                <div className="grid grid-cols-2 gap-3 text-center transition-all duration-75">
                  <button
                    className={cx(
                      "border-tx-border flex cursor-pointer justify-center gap-2 rounded-md border p-2.5",
                      {
                        "bg-tx-primary/20 text-tx-primary border-tx-primary": theme === "light",
                        "hover:bg-tx-border/20": theme !== "light",
                      }
                    )}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-5 w-5" />
                    Light
                  </button>
                  <button
                    className={cx(
                      "border-tx-border flex cursor-pointer justify-center gap-2 rounded-md border p-2.5",
                      {
                        "bg-tx-primary/20 text-tx-primary border-tx-primary": theme === "dark",
                        "hover:bg-tx-border/20": theme !== "dark",
                      }
                    )}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon01 className="h-5 w-5" />
                    Dark
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-2">Brand Color</p>
                <div className="flex items-center gap-2">
                  <ColorPicker
                    value={brandColor}
                    onChange={val => {
                      setBrandColor(val.toHexString());
                    }}
                    className="textl w-ful-left"
                  />
                  <p className="text-base">{brandColor?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          }
          trigger="click"
        >
          <button className="flex cursor-pointer items-center gap-2">
            {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon01 className="h-5 w-5" />}
            <div className="bg-tx-primary h-2 w-2 rounded-full" />
            <ChevronDown className="h-4 w-4" />
          </button>
        </Popover>
        <Popover
          content={
            <div className="text-tx-text-primary flex flex-col gap-3 text-sm">
              <button className="hover:bg-tx-secondary/30 flex cursor-pointer items-center gap-2 rounded-md p-2">
                <USFlag className="h-7 w-7" />
                English
              </button>
              <button className="hover:bg-tx-secondary/30 flex cursor-pointer items-center gap-2 rounded-md p-2">
                <IDFlag className="h-7 w-7" />
                Bahasa Indonesia
              </button>
            </div>
          }
          trigger="click"
        >
          <button className="flex items-center gap-2">
            <USFlag className="h-5 w-5" />
            <p>EN</p>
            <ChevronDown className="h-4 w-4" />
          </button>
        </Popover>
        <Popover
          content={
            <div className="w-[300px] p-4 text-center">
              <p className="text-tx-text-500">Tidak ada notifikasi</p>
            </div>
          }
          trigger="click"
        >
          <button className="relative flex items-center gap-2">
            <Bell01 className="h-5 w-5" />
            <span className="bg-tx-error absolute top-0 right-0 flex h-4 w-4 translate-x-1/4 -translate-y-1/3 items-center justify-center rounded-full text-[7px] font-semibold text-white">
              99+
            </span>
          </button>
        </Popover>
        <Popover content={<div className="w-[200px]">ltes</div>} trigger="click">
          <button className="ml-3 flex items-center gap-2">
            <Image
              src="/sample/profile.jpg"
              width={40}
              height={40}
              alt="Profile"
              className="rounded-full"
            />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">Siti Ropeah</p>
              <p className="text-xs">Admin</p>
            </div>
            <ChevronDown className="ml-3 h-4 w-4" />
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default MainLayout;
