/**
 * Hooks index
 */

// ============================================================================
// RAINFALL HOOKS
// ============================================================================
export {
  // rainfall data hooks
  useRainfallGrids,
  useRainfallAllGrids,
  useRainfallStations,
  useRainfallIsohyets,
  useRainfallComposite,

  // uncertainty of rainfall data hooks
  useRainfallUncertaintyGrids,
  useRainfallUncertaintyAllGrids,
  useRainfallUncertaintyComposite,
} from "./rainfall";

// ============================================================================
// EVAPORATION HOOKS
// ============================================================================


// ============================================================================
// SOLAR HOOKS
// ============================================================================
  

// ============================================================================
// UseRequiredConditionsofUse HOOK
// ============================================================================
export { default as useRequiredConditionsOfUse } from "@/hooks/useRequiredConditionsOfUse";

// ============================================================================
// Old naming convention to prevent issues
// ============================================================================
export { useRainfallGrids as useGrids } from "./rainfall/grids";
export { useRainfallAllGrids as useAllGrids } from "./rainfall/grids";
export { useRainfallStations as useStations } from "./rainfall/stations";
export { useRainfallIsohyets as useIsohyets } from "./rainfall/isohyets";
export { useRainfallComposite as useRainfallData } from "./rainfall/composite";
export { useRainfallUncertaintyGrids as useUncertaintyGrids } from "./rainfall/uncertainty/grids";
export { useRainfallUncertaintyAllGrids as useAllUncertaintyGrids } from "./rainfall/uncertainty/grids";
export { useRainfallUncertaintyComposite as useUncertaintyData } from "./rainfall/uncertainty/composite";
