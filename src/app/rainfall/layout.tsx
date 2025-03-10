import React from "react";
import { LayoutProvider } from "@/components/LayoutContext";

export default function MainLayout (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <LayoutProvider
      navLinks={[
        { text: 'Home', path: '/rainfall'},
        { text: 'Interactive Map', path: '/rainfall/interactive-map' },
        { text: 'Downloads', path: '/rainfall/downloads'},
        { text: 'How to cite', path: '/rainfall/how-to-cite' },
        { text: 'History', path: '/rainfall/history'},
        { text: 'Methods', path: '/rainfall/methods' },
        { text: 'Rainfall', path: '/rainfall/rainfall' },
        { text: 'Acknowledgements', path: '/rainfall/acknowledgements' },
        { text: 'People', path: '/rainfall/people' },
      ]}
      navImg="rainfall"
    >
      {children}
    </LayoutProvider>
  );
}