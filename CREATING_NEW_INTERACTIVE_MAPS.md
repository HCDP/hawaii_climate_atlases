# Creating New Interactive Maps with ClimateMap

The new `ClimateMap` architecture makes it incredibly easy to create interactive maps for any climate variable! Here's how:

## 🎯 Step-by-Step Guide

### 1. **Create Your Map Component**

```typescript
// src/components/maps/SolarMap/SolarMap.tsx
import React from "react";
import ClimateMap from "../ClimateMap";

const SOLAR_CONFIG = {
  enableStations: false,           // Solar stations are rare
  enableIsohyets: false,          // No isohyets for solar data
  enableUncertaintyToggle: false, // Different uncertainty approach
  enableDualLoading: false,       // Simpler loading pattern
};

const SolarRadiationMap: React.FC = () => {
  return <ClimateMap config={SOLAR_CONFIG} />;
};

export default SolarRadiationMap;
```

### 2. **Add Your Data Hooks** (Already exist!)

The hooks structure is already set up:
```
src/hooks/
├── solar-radiation/
│   ├── grids.ts      ✅ Already exists!
│   ├── stations.ts   ✅ Already exists!
│   └── composite.ts  ✅ Already exists!
└── evaporation/      ✅ Already exists!
```

### 3. **Create API Endpoints**

```typescript
// src/app/api/solar/grids/[units]/[period]/route.ts
export async function GET(request: Request, { params }: { params: { units: string, period: string } }) {
  // Your solar data fetching logic
  return Response.json(solarGridData);
}
```

### 4. **Add Color Layer** (if needed)

```typescript
// src/components/maps/SolarMap/SolarColorLayer.ts
import { createBaseRasterLayer } from "../shared/BaseRasterLayer";

// Create solar-specific color layer
export const SolarColorLayer = createLayerComponent(createSolarComponent);
```

## 🚀 **Configuration Options**

Each map type can have its own configuration:

```typescript
// ☀️ Solar Radiation Map
const SOLAR_CONFIG = {
  enableStations: false,    // Few solar monitoring stations
  enableIsohyets: false,    // No isohyets for solar
  enableUncertaintyToggle: false,
  enableDualLoading: false, // W/m² vs kWh/m²/day
};

// 💨 Evapotranspiration Map  
const ET_CONFIG = {
  enableStations: true,     // Weather stations measure ET
  enableIsohyets: false,    // No isohyets for ET
  enableUncertaintyToggle: true,  // ET has modeling uncertainty
  enableDualLoading: true,  // mm/day vs inches/day
};

// 🌡️ Temperature Map
const TEMPERATURE_CONFIG = {
  enableStations: true,     // Many temperature stations
  enableIsohyets: true,     // Isotherms (temperature contours)
  enableUncertaintyToggle: true,
  enableDualLoading: true, // °C vs °F
};

// 💧 Humidity Map
const HUMIDITY_CONFIG = {
  enableStations: true,
  enableIsohyets: false,
  enableUncertaintyToggle: false,
  enableDualLoading: false, // % humidity (no unit conversion)
};
```

## 📊 **Usage Examples**

```typescript
// In your page components
import SolarRadiationMap from "@/components/maps/SolarMap";
import EvapotranspirationMap from "@/components/maps/EvapotranspirationMap"; 
import RainfallMap from "@/components/maps/RainfallMap";

// Solar radiation interactive map
<SolarRadiationMap />

// Evapotranspiration interactive map  
<EvapotranspirationMap />

// Rainfall interactive map (full-featured)
<RainfallMap />

// Custom configuration
<ClimateMap config={CUSTOM_CONFIG} />
```

## 🎨 **What Each Map Automatically Gets**

Every `ClimateMap` instance automatically includes:

✅ **Core Features (Always)**
- Interactive Leaflet map
- Click-to-query grid values
- Period selection (Jan-Dec, Annual)
- Unit switching (if enabled)
- Popup with location data
- Basemap selection
- Zoom/pan controls
- Responsive design

✅ **Optional Features (Config-Driven)**
- Station markers and data
- Isohyet/contour lines  
- Uncertainty layer toggle
- Dual loading optimization
- Background prefetch indicators

## 🔧 **Extending ClimateMap**

If you need custom behavior, you can:

1. **Pass custom data ranges:**
   ```typescript
   const config = {
     ...SOLAR_CONFIG,
     solarRanges: {
       IN: [[100, 350], [120, 380], ...], // W/m² ranges by period
       MM: [[100, 350], [120, 380], ...], // Same for metric
     }
   };
   ```

2. **Override default hooks:** Modify `ClimateMap.tsx` to accept custom hook functions

3. **Add new layer types:** Create new color layers and import them

## 🌟 **Benefits of This Architecture**

- **🚀 Fast Development**: New map = ~10 lines of code
- **🔄 Consistent UX**: All maps work the same way
- **⚡ Performance**: Inherits all optimizations (dual loading, memoization)
- **🛠️ Maintainable**: Update one component, all maps improve
- **📱 Responsive**: Mobile-friendly out of the box
- **🎯 Type Safe**: Full TypeScript support

## 🎯 **Next Steps**

1. **Add API endpoints** for your data type
2. **Create color scales** for your variable ranges  
3. **Configure map behavior** with the config object
4. **Deploy and test** - it just works! ✨

The `ClimateMap` component handles all the complex map logic, so you can focus on your climate data and user experience!