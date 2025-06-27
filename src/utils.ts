import { Units, Period } from "@/lib";

export function capitalize(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function isUnits(unitsString: string): unitsString is Units {
  return unitsString.toLocaleUpperCase() in Units;
}

export function isPeriod(periodString: string): periodString is keyof typeof Period {
  return Object.keys(Period)
    .filter(key => isNaN(Number(key)))
    .includes(capitalize(periodString.toLowerCase()));
}
