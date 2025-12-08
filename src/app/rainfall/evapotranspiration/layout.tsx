import React from "react";
import { LayoutProvider } from "@/components/LayoutContext";
import { ConditionsOfUseProvider } from "@/components/ConditionsOfUse";

export default function EvapotranspirationLayout(
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
          { text: 'Home', path: '/evapotranspiration' },
          { text: 'Interactive Map', path: '/evapotranspiration/interactive-map' },
        ]}
        navImg="evapotranspiration"
      >
        {children}
      </LayoutProvider>
    </ConditionsOfUseProvider>
  );
}
