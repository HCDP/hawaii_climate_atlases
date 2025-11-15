import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import { createBaseRasterLayer, RasterOptions } from "../../shared/BaseRasterLayer";

let R: any = L;

// Create the uncertainty-specific GridLayer using the shared base
R.GridLayer.UncertaintyRasterLayer = createBaseRasterLayer("UncertaintyRasterLayer");

R.gridLayer.UncertaintyRasterLayer = function (options: RasterOptions) {
  // Set the red color scheme for uncertainty maps (yellow to dark red)
  const uncertaintyOptions: RasterOptions = {
    ...options,
    colorScheme: options.colorScheme || ['#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
  };
  return new R.GridLayer.UncertaintyRasterLayer(uncertaintyOptions);
};

const createUncertaintyComponent = (props: any, context: any) => {
  let rasterLayer = R.gridLayer.UncertaintyRasterLayer(props.options);

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

export const UncertaintyColorLayer = createLayerComponent(createUncertaintyComponent);
