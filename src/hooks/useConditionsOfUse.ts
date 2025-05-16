import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "@/components/LayoutContext";

const dontShowConditionsOfUseKey = "do_not_show_conditions_of_use";

export default function useConditionsOfUse() {
  const [dontShowConditionsOfUse, setDontShowConditionsOfUse] = useState<boolean>(() => {
    const preference: string | null = localStorage.getItem(dontShowConditionsOfUseKey);
    return preference ? JSON.parse(preference) : false;
  });

  function updateDontShowConditionsOfUse(preference: boolean) {
    setDontShowConditionsOfUse(preference);
    if (preference) {
      localStorage.setItem(dontShowConditionsOfUseKey, JSON.stringify(preference));
    }
  }

  const { onOpenConditionsOfUse, onOpenRequiredConditionsOfUse } = useContext(LayoutContext);
  useEffect(() => {
    if (!dontShowConditionsOfUse) {
      onOpenRequiredConditionsOfUse();
    }
  }, []);

  return {
    onOpenConditionsOfUse,
    onOpenRequiredConditionsOfUse,
    updateDontShowConditionsOfUse,
  }
}
