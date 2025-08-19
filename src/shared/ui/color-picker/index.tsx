import AntColorPicker from "antd/es/color-picker";

export type ColorPickerProps = React.ComponentProps<typeof AntColorPicker>;

export const ColorPicker = (props: ColorPickerProps) => {
  return <AntColorPicker {...props} />;
};
