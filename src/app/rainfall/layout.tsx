import React from "react";
import { LayoutProvider } from "@/components/LayoutControlContext";

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
        { text: 'Home', path: '/'},
        { text: 'Interactive Map', path: '/interactive-map' },
        { text: 'Downloads', path: '/downloads'},
        { text: 'How to cite', path: '/how-to-cite' },
        { text: 'History', path: '/history'},
        { text: 'Methods', path: '/methods' },
        { text: 'Rainfall', path: '/rainfall' },
        { text: 'Acknowledgements', path: '/acknowledgements' },
        { text: 'People', path: '/people' },
      ]}
      navImg="rainfall"
    >
      {children}
    </LayoutProvider>
  );
}