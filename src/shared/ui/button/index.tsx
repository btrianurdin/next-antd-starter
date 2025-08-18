import AntButton from "antd/es/button/button";

export type Button = React.ComponentProps<typeof AntButton>;

export const Button = (props: Button) => {
  return <AntButton {...props} />;
};
