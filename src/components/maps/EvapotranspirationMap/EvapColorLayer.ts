import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import { createBaseRasterLayer, RasterOptions, ColorScale } from "../shared/BaseRasterLayer";

let R: any = L;

// Create the rainfall-specific GridLayer using the shared base
R.GridLayer.EvapRasterLayer = createBaseRasterLayer("EvapRasterLayer");

R.gridLayer.EvapRasterLayer = function (options: RasterOptions) {
  // Set the rainbow color scheme for rainfall maps
  const evapOptions: RasterOptions = {
    ...options,
    colorScheme: options.colorScheme || ['#4041fe', '#698afe', '#6bc0ff', '#3fffff', '#aeffc7', '#ddff8f', '#ffff3f', '#ffca40', '#ff9340', '#ff9340'],
    // Custom breakpoints: each value maps to the corresponding color in colorScheme
    // e.g., '#4041fe' covers 0–300, '#698afe' covers 300–450, etc.
    colorDomain: options.colorDomain || [0, 0.3, 0.45, 0.6, 0.72, 0.85, 1.0, 1.15, 1.35, 1.5, 2.3],
  };
  return new R.GridLayer.EvapRasterLayer(evapOptions);
};

const createEvapComponent = (props: any, context: any) => {
    let rasterLayer = R.gridLayer.EvapRasterLayer(props.options);

  /* Prevents selected basemap from overlapping the raster layer
  setTimeout here allows bringToFront() to run after re-renders are done */
  setTimeout(() => {
    if (context.map.hasLayer(rasterLayer)) {
      rasterLayer.bringToFront();
    }
  }, 0);

  return {
    instance: rasterLayer,
    context: {
      __version: 1,
      map: context.map,
      layerContainer: rasterLayer
    }
  };
}

export const EvapColorLayer = createLayerComponent(createEvapComponent);
