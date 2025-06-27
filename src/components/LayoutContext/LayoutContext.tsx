"use client"

import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import NavBar, { NavBarProps } from "@/components/NavBar";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export const LayoutContext = createContext<{
  maximized: boolean,
  setMaximized: Dispatch<SetStateAction<boolean>>,
}>({
  maximized: false,
  setMaximized: () => {},
});

interface Props extends NavBarProps {
  children: React.ReactNode,
}

export const LayoutProvider: React.FC<Props> = ({ children, navLinks, navImg }: Props) => {
  const [maximized, setMaximized] = useState<boolean>(false);


  const pathname: string = usePathname();
  const isMapPage: boolean = pathname === '/rainfall/interactive-map';

  const navBar = useMemo(() => <NavBar navLinks={navLinks} navImg={navImg} />, [navLinks, navImg]);
  const footer = useMemo(() => <Footer />, []);
  // Show the navbar and footer on all other pages. If we're on the map page, show it if maximized is false.
  const show: boolean = !maximized || !isMapPage;

  return (
    <LayoutContext.Provider
      value={{
        maximized,
        setMaximized,
      }}
    >
      <div className={isMapPage ? 'flex flex-col min-h-screen h-screen max-h-screen' : ''}>
        {show && navBar}
        <main
          className={isMapPage ? 'flex-grow overflow-y-hidden h-full max-w-screen font-sans' : 'min-h-screen h-full max-w-screen font-serif'}
        >
          {children}
        </main>
        {show && footer}
      </div>
    </LayoutContext.Provider>
  );
};
