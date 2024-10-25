"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const NavBar: React.FC<{
  navLinks: {
    text: string,
    path: string,
  }[]
}> = (props) => {
  const path: string = usePathname();
  const { navLinks } = props;
  return (
    <nav role="navigation" className="flex justify-center h-full ">
      <ul className="space-x-4 font-bold text-white mt-3">
        {navLinks.map(navLink => (
          <li className="inline" key={navLink.path}>
            <Link
              className={`text-nowrap hover:text-gray-400 ${path === navLink.path && 'text-gray-400'}`}
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
