"use client";

import { usePathname } from "next/navigation";
import LinkButton from "./form/LinkButton";

const Header = () => {
  const pathname = usePathname();
  return (
    <header>
      Home Info
      {pathname == "/" && <LinkButton href="/edit">Edit</LinkButton>}
    </header>
  );
};

export default Header;
