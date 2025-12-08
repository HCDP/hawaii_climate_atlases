import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";

/**
 * Factory to create color layer components with consistent update logic.
 * Eliminates code duplication between RainfallColorLayer, UncertaintyColorLayer, etc.
 */
export function createColorLayerComponent(gridLayerFactory: (options: any) => any) {
  const createComponent = (props: any, context: any) => {
    const rasterLayer = gridLayerFactory(props.options);

    // Prevents selected basemap from overlapping the raster layer
    // setTimeout allows bringToFront() to run after re-renders are done
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
  };

  const updateComponent = (instance: any, props: any, prevProps: any) => {
    const newOpts = props.options || {};
    const oldOpts = prevProps?.options || {};

    // Update asciiGrid data if changed
    if (newOpts.asciiGrid && newOpts.asciiGrid !== oldOpts.asciiGrid) {
      if (typeof instance.setData === 'function') {
        instance.setData(newOpts.asciiGrid);
      }
    }

    // Update color scale if range or scheme changed
    const rangeChanged = newOpts.colorScale?.range && oldOpts.colorScale?.range &&
      (newOpts.colorScale.range[0] !== oldOpts.colorScale.range[0] || 
       newOpts.colorScale.range[1] !== oldOpts.colorScale.range[1]);
    const schemeChanged = newOpts.colorScheme !== oldOpts.colorScheme;
    
    if (rangeChanged || schemeChanged) {
      if (typeof instance.setColorScale === 'function') {
        instance.options.colorScheme = newOpts.colorScheme || instance.options.colorScheme;
        instance.options.colorScale = newOpts.colorScale || instance.options.colorScale;
        instance.setColorScale();
      }
    }

    // Ensure layer stays on top
    setTimeout(() => {
      if (instance?.bringToFront) instance.bringToFront();
    }, 0);
  };

  return createLayerComponent(createComponent, updateComponent);
}
