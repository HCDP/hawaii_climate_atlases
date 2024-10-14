"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface Props {
  navLinks: {
    text: string,
    path: string,
  }[]
}

const NavBar = (props: Props) => {
  const path: string = usePathname();
  const { navLinks } = props;
  return (
    <nav role="navigation" className="flex justify-center my-2">
      <ul className="space-x-4 font-bold text-white">
        {navLinks.map(navLink => (
          <li className="inline" key={navLink.path}>
            <Link
              className={`hover:text-gray-400 ${path === navLink.path && 'text-gray-400'}`}
              href={navLink.path}
            >
              {navLink.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
