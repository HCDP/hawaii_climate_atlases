import { Units, Period, Month, Hour } from "@/lib";

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

export function isMonth(monthString: string): monthString is keyof typeof Month {
  return Object.keys(Month)
    .filter(key => isNaN(Number(key)))
    .includes(capitalize(monthString.toLowerCase()));
}

export function isHour(hourString: string): hourString is Hour {
  return Object.values(Hour).includes(hourString as Hour);
}