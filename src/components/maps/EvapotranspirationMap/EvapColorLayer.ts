import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import { createBaseRasterLayer, RasterOptions, ColorScale } from "../shared/BaseRasterLayer";

let R: any = L;

// Create the rainfall-specific GridLayer using the shared base
R.GridLayer.EvapRasterLayer = createBaseRasterLayer("EvapRasterLayer");

R.gridLayer.EvapRasterLayer = function (options: RasterOptions) {
  // Set the rainbow color scheme for evapotranspiration maps
  const evapOptions: RasterOptions = {
    ...options,
    colorScheme: options.colorScheme || ['#1a16f3', '#3fffff', '#ffff3f', '#ff9340', '#ff2000'],
    // specify padding for better color distribution, especially for skewed data like evap
    colorPadding: options.colorPadding ?? [-0.75, -0.10],
    // gamma < 1 shifts the scale so reds/oranges appear for a wider range of higher values
    colorGamma: (options as any).colorGamma ?? 0.4,
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
