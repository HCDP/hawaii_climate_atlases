"use client"
// its ok if this is a client component, children will still be server rendered (i think)
import React, { useState } from 'react';
import { LayoutContext } from './LayoutContext';
import NavBar, { NavBarProps } from "@/components/NavBar";
import Footer from "@/components/Footer";
import {usePathname} from "next/navigation";

interface Props extends NavBarProps {
  children: React.ReactNode,
}

export const LayoutProvider: React.FC<Props> = ({ children, navLinks, navImg }) => {
  const [maximized, setMaximized] = useState<boolean>(false);
  const pathname = usePathname();

  const isMapPage = pathname === '/interactive-map';

  return (
    <LayoutContext.Provider value={{ maximized, setMaximized }}>
      <div className={isMapPage ? 'flex flex-col min-h-screen h-screen max-h-screen' : ''}>
        {!maximized && (
          <NavBar navLinks={navLinks} navImg={navImg} />
        )}
        <main
          className={isMapPage ? 'flex-grow overflow-y-hidden h-full max-w-screen font-sans' : 'min-h-screen h-full max-w-screen font-serif'}
        >
          {children}
        </main>
        {!maximized && (
          <Footer />
        )}
      </div>
    </LayoutContext.Provider>
  );
};
