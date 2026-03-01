/**
 * Evaporation hooks - centralized exports
 * 
 * This file provides a single import point for all evapotranspiration-related hooks.
 * You can import from here or directly from the specific files.
 */

// Grid hooks
export { useEvapGrids, useEvapAllGrids } from "./grids";

// Station hooks
export { useEvapStations } from "./stations";

// Composite hook
export { useEvapComposite } from "./composite";
