import { useContext, useEffect } from "react";
import {
  ConditionsOfUseContext,
  DO_NOT_SHOW_CONDITIONS_OF_USE_KEY,
} from "@/components/ConditionsOfUse/ConditionsOfUseContext";

export default function useRequiredConditionsOfUse() {
  const { onOpenRequiredConditionsOfUse } = useContext(ConditionsOfUseContext);
  useEffect(() => {
    const preference: string | null = localStorage.getItem(DO_NOT_SHOW_CONDITIONS_OF_USE_KEY);
    const dontShowConditionsOfUse = preference ? JSON.parse(preference) : false;
    if (!dontShowConditionsOfUse) {
      onOpenRequiredConditionsOfUse();
    }
  });

  return {
    onOpenRequiredConditionsOfUse,
  }
}
