"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const imagePaths: {
  [key: string]: {
    banner: string,
    bg: string,
  }
} = {
  rainfall: {
    banner: "/rainfall_banner.png",
    bg: "/rf_bg.gif",
  },
  climate: {
    banner: "/climate_banner.jpg",
    bg: "/rf_bg.gif",
  },
  evapotranspiration: {
    banner: "/evapotranspiration_banner.jpg",
    bg: "/rf_bg.gif",
  },
  solarradiation: {
    banner: "/solarradiation_banner.jpg",
    bg: "/rf_bg.gif",
  },
}
const baseUrl = "/banners";

export interface Props {
  navLinks: {
    text: string,
    path: string,
  }[],
  navImg: "rainfall" | "climate" | "evapotranspiration" | "solarradiation",
}

const NavBar: React.FC<Props> = ({ navLinks, navImg }) => {
  const path: string = usePathname();
  const imgSrc: string = baseUrl + imagePaths[navImg].banner;
  const bgSrc: string = baseUrl + imagePaths[navImg].bg;
  return (
    <div className="bg-[#708090]">
      <div className="h-[140px] overflow-visible">
        <img className="mx-auto max-h-none max-w-none" src={`/hawaii_climate_atlases${imgSrc}`} alt="Rainfall Atlas of Hawaii banner"/>
      </div>
      <div
        className="h-[45px] w-full min-w-[972px]"
        style={{ background: `url('${bgSrc}')` }}
      >
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
