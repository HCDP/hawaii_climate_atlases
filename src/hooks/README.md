
## ARCHITECTURE OF SRC/HOOKS/  
==============================================================================================
src/hooks/
│
├── index.ts                          Exports
├── README.md                         Template for subject types
├── useRequiredConditionsofUse.ts     Conditions of Use Component
│
├── core/                             
│   └── (for any generic or shared hooks among climate folders)
│
├── rainfall/                         All rainfall data
│   ├── index.ts                      → Exports all rainfall hooks
│   ├── grids.ts                      → useRainfallGrids, useRainfallAllGrids  
│   ├── stations.ts                   → useRainfallStations
│   ├── isohyets.ts                   → useRainfallIsohyets
│   ├── composite.ts                  → useRainfallComposite
│   └── uncertainty/                  Rainfall uncertainty
│       ├── grids.ts                  → useRainfallUncertaintyGrids, useRainfallUncertaintyAllGrids
│       └── composite.ts              → useRainfallUncertaintyComposite
│
├── solar-radiation/                  All solar radiation data
│   ├──  index.ts                     → Exports all solar hooks
│   ├──  grids.ts                     
│   ├──  stations.ts
│   └──  composite.ts
│
├── evaporation/                      All evaporation data
│   ├──  index.ts                     → Exports all evaporation hooks
│   ├──  grids.ts
│   ├──  stations.ts
│   └──  composite.ts
==============================================================================================


## Hook Naming Pattern
==============================================================================================
### Syntax:
use[Subject][Granularity][DataVariant]
- **Subject**: Rainfall, SolarRadiation, SoilEvaporation
- **Granularity**: (single), All, Uncertainty
- **DataVariant**: Grids, Stations, Isohyets, Composite

### Examples:
- useRainfallOneGrids           - Single period rainfall grid
- useRainfallAllGrids           - All 13 periods (Jan-Dec + Annual)
- useRainfallUncertaintyGrids   - Single period of rainfall uncertainty data for rainfall
==============================================================================================


## SWR Configuration Guidelines
==============================================================================================
### When to use `keepPreviousData: true`:
- **Station data** - Station data doesn't affect color layers
- **Isohyet data** - Isohyet data doesn't affect color layers

### When NOT to use `keepPreviousData`:
- **Grid data** - Must be cleared when units change to prevent mismatched colors
- **Data tied to color scales** - Prevents rendering with wrong ranges
==============================================================================================
