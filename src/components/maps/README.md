## ARCHITECTURE OF COMPONENTS/MAPS/  
==============================================================================================
components/maps/
│
├── README.md                         Architecture and Template
│
├── shared/
│   ├── RasterColorLayer.ts       ← Shared color layer
│   ├── PopupOnClick.tsx          ← Shared popup
│   ├── MapControls.tsx           ← Shared controls
│   └── useMapState.ts            ← Shared state logic
|
├── RainfallMap/
│   ├── RainfallMap.tsx           ← Uses shared components
│   ├── StationIcons.tsx          ← Rainfall-specific
│   └── IsohyetLabels.tsx         ← Rainfall-specific
|   └── UncertaintyMap/
        └── UncertaintyMap.tsx    ← Uses shared components
==============================================================================================
