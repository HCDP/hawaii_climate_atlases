import React from "react";
import { LayoutProvider } from "@/components/LayoutContext";
import { ConditionsOfUseProvider } from "@/components/ConditionsOfUse";

export default function MainLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <ConditionsOfUseProvider>
      <LayoutProvider
        navLinks={[
          { text: 'Home', path: '/evap' },
          { text: 'Interactive Map', path: '/evap/interactive-map' },
          { text: 'Downloads', path: '/evap/downloads' },
          { text: 'How to cite', path: '/evap/how-to-cite' },
          { text: 'History', path: '/history' },
          { text: 'Methods', path: '/methods' },
          { text: 'Acknowledgements', path: '/acknowledgements' },
          { text: 'People', path: '/people' },
        ]}
        navImg="evapotranspiration"
      >
        {children}
      </LayoutProvider>
    </ConditionsOfUseProvider>
  );
}
