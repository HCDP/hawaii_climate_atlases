import React from "react";
import SideBar from '@/components/SideBar';

export default function InteractiveMapLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex map-layout">
      <div className="min-w-[24rem]">
        <SideBar/>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
