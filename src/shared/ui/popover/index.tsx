import AntPopover from "antd/es/popover";

export type PopoverProps = React.ComponentProps<typeof AntPopover>;

export const Popover = (props: PopoverProps) => {
  return <AntPopover {...props} />;
};
