"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, {useMemo} from "react";

export interface Props {
  navLinks: {
    text: string,
    path: string,
  }[],
  navImg: "rainfall" | "climate" | "evapotranspiration" | "solarradiation",
}

const NavBar: React.FC<Props> = ({ navLinks, navImg }) => {
  const path: string = usePathname();
  let imgSrc: string;
  switch (navImg) {
    case "rainfall": imgSrc = "/rainfall_banner.png"; break;
    case "climate": imgSrc = "/climate_banner.jpg"; break;
    case "evapotranspiration": imgSrc = "/evapotranspiration_banner.jpg"; break;
    case "solarradiation": imgSrc = "/solarradiation_banner.jpg"; break;
  }
  const banner = useMemo(() => (
    <img className="mx-auto max-h-none max-w-none" src={imgSrc} alt="Rainfall Atlas of Hawaii banner"/>
  ), []);
  return (
    <div className="bg-[#708090]">
      <div className="h-[140px] overflow-visible">
      {banner}
      </div>
      <div className="h-[45px] w-full min-w-[972px] bg-[url('/navi_bg.gif')]">
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
      </div>
    </div>
  );
};

export default NavBar;
