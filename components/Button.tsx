import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: Props) => {
  return <button className="btn" {...props}>{children}</button>;
};

export default Button;
