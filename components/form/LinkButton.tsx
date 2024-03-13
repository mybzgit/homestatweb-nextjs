import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string
} & LinkProps;

const LinkButton = ({ children, className, ...props }: Props) => {
  return (
    <Link className={className == undefined ? "btn": className} {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
