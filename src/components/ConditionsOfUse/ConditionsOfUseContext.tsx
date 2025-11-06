"use client"

import React, { createContext } from "react";
import { ConditionsOfUse, RequiredConditionsOfUse } from "@/components/ConditionsOfUse";
import { useDisclosure } from "@heroui/modal";

export const DO_NOT_SHOW_CONDITIONS_OF_USE_KEY = "do_not_show_conditions_of_use";

export const ConditionsOfUseContext = createContext<{
  onOpenConditionsOfUse: () => void,
  onOpenRequiredConditionsOfUse: () => void,
  updateDontShowConditionsOfUsePreference: (preference: boolean) => void,
}>({
  onOpenConditionsOfUse: () => {},
  onOpenRequiredConditionsOfUse: () => {},
  updateDontShowConditionsOfUsePreference: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const ConditionsOfUseProvider = ({ children }: Props) => {
  const conditionsOfUseDisclosure = useDisclosure();
  const requiredConditionsOfUseDisclosure = useDisclosure();

  function updateDontShowConditionsOfUsePreference(preference: boolean) {
    if (preference) {
      localStorage.setItem(DO_NOT_SHOW_CONDITIONS_OF_USE_KEY, JSON.stringify(preference));
    }
  }

  return (
    <ConditionsOfUseContext.Provider
      value={{
        onOpenConditionsOfUse: conditionsOfUseDisclosure.onOpen,
        onOpenRequiredConditionsOfUse: requiredConditionsOfUseDisclosure.onOpen,
        updateDontShowConditionsOfUsePreference,
      }}
    >
      <ConditionsOfUse
        isOpen={conditionsOfUseDisclosure.isOpen}
        onOpenChange={conditionsOfUseDisclosure.onOpenChange}
      />
      <RequiredConditionsOfUse
        isOpen={requiredConditionsOfUseDisclosure.isOpen}
        onOpenChange={requiredConditionsOfUseDisclosure.onOpenChange}
        updateDontShowConditionsOfUsePreference={updateDontShowConditionsOfUsePreference}
      />
      {children}
    </ConditionsOfUseContext.Provider>
  );
}
