"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const imagePaths: {
  [key: string]: string
} = {
  rainfall: "/rainfall_banner.png",
  climate: "/climate_banner.jpg",
  evapotranspiration: "/evapotranspiration_banner.jpg",
  solarradiation: "/solarradiation_banner.jpg",
}

export interface Props {
  navLinks: {
    text: string,
    path: string,
  }[],
  navImg: "rainfall" | "climate" | "evapotranspiration" | "solarradiation",
}

const NavBar: React.FC<Props> = ({ navLinks, navImg }) => {
  const path: string = usePathname();
  const imgSrc: string = imagePaths[navImg];
  console.log(path);
  return (
    <div className="bg-[#708090]">
      <div className="h-[140px] overflow-visible">
        <img className="mx-auto max-h-none max-w-none" src={`/hawaii_climate_atlases/${imgSrc}`} alt="Rainfall Atlas of Hawaii banner"/>
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
