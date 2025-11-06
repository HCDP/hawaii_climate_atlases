import { AsciiGrid } from "@/lib";
import chroma from "chroma-js";
import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import { createBaseRasterLayer, RasterOptions, ColorScale } from "../shared/BaseRasterLayer";

let R: any = L;

// Create the rainfall-specific GridLayer using the shared base
R.GridLayer.RainfallRasterLayer = createBaseRasterLayer("RainfallRasterLayer");

R.gridLayer.RainfallRasterLayer = function (options: RasterOptions) {
  // Set the rainbow color scheme for rainfall maps
  const rainfallOptions: RasterOptions = {
    ...options,
    colorScheme: options.colorScheme || ['red', 'yellow', 'green', 'blue', 'purple', 'indigo'],
  };
  return new R.GridLayer.RainfallRasterLayer(rainfallOptions);
};

const createRainfallComponent = (props: any, context: any) => {
    let rasterLayer = R.gridLayer.RainfallRasterLayer(props.options);

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

export const RainfallColorLayer = createLayerComponent(createRainfallComponent);
