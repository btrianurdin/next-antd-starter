import {
  Building01Filled,
  Cube04Filled,
  Home05Filled,
  Settings02Filled,
} from "@/shared/components/icons";
import { Building01, Cube04, Home05, Settings02 } from "@untitled-ui/icons-react";

type SidebarLink = {
  label: string;
  icon?: React.ElementType;
  filledIcon?: React.ElementType;
  href?: string;
  breadcrumb?: {
    type: "static" | "dynamic";
    loader?: () => Promise<any>;
  };
  children?: SidebarLink[];
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    icon: Home05,
    filledIcon: Home05Filled,
    href: "/",
    breadcrumb: {
      type: "static",
    },
  },
  {
    label: "3D Monitoring",
    icon: Cube04,
    filledIcon: Cube04Filled,
    href: "/3d-monitoring",
    breadcrumb: {
      type: "static",
    },
  },
  {
    label: "Warehouse",
    icon: Building01,
    filledIcon: Building01Filled,
    href: "/warehouse",
    breadcrumb: {
      type: "static",
    },
  },
  {
    label: "Settings",
    icon: Settings02,
    filledIcon: Settings02Filled,
    children: [
      {
        label: "Role Management",
        href: "/settings/role-management",
        breadcrumb: {
          type: "static",
        },
      },
      {
        label: "User Management",
        href: "/settings/user-management",
        breadcrumb: {
          type: "static",
        },
      },
    ],
  },
];
