## ARCHITECTURE OF COMPONENTS/MAPS/  
==============================================================================================
components/maps/
│
├── README.md                         Architecture and Template
│
├── shared/                             
│   ├── RasterColorLayer.ts
│   ├── PopupOnClick.tsx
│   ├── MapControls.tsx
│   └── useMapState.ts
│
│
├── evaporation/                      All evaporation data
│   ├──  index.ts                     → Exports all evaporation hooks
│   ├──  grids.ts
│   ├──  stations.ts
│   └──  composite.ts
==============================================================================================
