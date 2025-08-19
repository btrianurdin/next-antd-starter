import type { ComponentProps } from "react";

export type FilledIconProps = ComponentProps<"svg"> & {
  fillColor?: string;
};
