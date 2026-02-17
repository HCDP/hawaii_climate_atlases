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
          { text: 'Home', path: '/' },
          { text: 'Interactive Map', path: '/interactive-map' },
          { text: 'Downloads', path: '/downloads' },
          { text: 'How to cite', path: '/how-to-cite-et' },
          { text: 'History', path: '/history' },
          { text: 'Methods', path: '/methods' },
          { text: 'Evapotranspiration', path: '/evap' },
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
