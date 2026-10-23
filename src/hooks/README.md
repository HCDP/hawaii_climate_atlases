
## ARCHITECTURE OF SRC/HOOKS/  
==============================================================================================
hooks/
├── index.ts                    # Main exports
├── useStations.ts             # Generic station fetching
├── useAllGrids.ts             # Keep if still used
├── useRequiredConditionsOfUse.ts
├── core/                      # Shared utilities
├── rainfall/
│   ├── composite.ts           # Main rainfall composite
│   ├── grids.ts              # Rainfall grids
│   ├── isohyets.ts           # Rainfall isohyets  
│   ├── stations.ts           # Rainfall stations
│   └── uncertainty/          # Uncertainty data
├── evaporation/              # Evaporation hooks
└── solar-radiation/          # Solar hooks
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
