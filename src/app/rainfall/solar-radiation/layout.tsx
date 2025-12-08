import React from "react";
import { LayoutProvider } from "@/components/LayoutContext";
import { ConditionsOfUseProvider } from "@/components/ConditionsOfUse";

export default function SolarRadiationLayout(
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
          { text: "Home", path: "/solar-radiation" },
          { text: "Interactive Map", path: "/solar-radiation/interactive-map" },
        ]}
        navImg="solarradiation"
      >
        {children}
      </LayoutProvider>
    </ConditionsOfUseProvider>
  );
}
