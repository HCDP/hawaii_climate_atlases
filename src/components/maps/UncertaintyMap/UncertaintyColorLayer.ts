import { AsciiGrid } from "@/lib";
import chroma from "chroma-js";
import L, { LatLng } from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";

export interface RasterOptions {
  cacheEmpty?: boolean,
  colorScale: ColorScale,
  asciiGrid: AsciiGrid,
  cache?: Set<string>,
}

interface Color {
  r: number,
  g: number,
  b: number,
  a: number,
}

export type ColorScale = {
  colors: Color[],
  range: [number, number],
}

let R: any = L;

function geoPosToColor(asciiGrid: AsciiGrid, geoPos: LatLng, colorScale: ColorScale): Color {
  let color: Color = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  };
  const { ncols, nrows, xllcorner, yllcorner, cellsize } = asciiGrid.header;
  const offset = new LatLng(geoPos.lat - yllcorner, geoPos.lng - xllcorner);

  // Find LatLng location in the ASCII file to grab its corresponding rainfall level
  const x = Math.floor(offset.lng / cellsize);
  const y = Math.floor(nrows - offset.lat / cellsize);

  // Check if the coordinates are within the grid range
  if (x < 0 || x >= ncols || y < 0 || y >= nrows) return color;

  const asciiGridLoc = ncols * y + x;
  const colorValue = asciiGrid.values[asciiGridLoc];

  // Handle no data values
  const nodata = (asciiGrid as any)?.header?.NODATA_value ?? (asciiGrid as any)?.header?.nodata;
  if (!Number.isFinite(colorValue) || (nodata !== undefined && colorValue === nodata)) {
    return { r: 0, g: 0, b: 0, a: 0 }; // transparent
  }

  // Using the file location/index, find the color that colorValue is mapped to
  const { colors, range } = colorScale;
  let rangePosition: number = colorValue < range[0] ? 0 :
    colorValue > range[1] ? range[1] - range[0] :
      colorValue - range[0];
  let scale = rangePosition / (range[1] - range[0]);
  let actualPosition = Math.round(scale * (colors.length - 1));

  return colors[actualPosition];
}

R.GridLayer.UncertaintyRasterLayer = L.GridLayer.extend({
  initialize: function (options: RasterOptions) {
    let rasterOptions: RasterOptions = {
      ...options
    };
    if (options.cacheEmpty) {
      rasterOptions.cache = new Set<string>();
    }
    else if (options.cacheEmpty == undefined) {
      rasterOptions.cacheEmpty = false;
    }
    L.Util.setOptions(this, rasterOptions);
    this.setColorScale();
  },

  clearEmptyTileCache: function () {
    if (this.options.cache) {
      this.options.cache.clear();
    }
  },

  // values: IndexedValues, header?: RasterHeader
  setData: function (asciiGrid: AsciiGrid) {
    this.options.asciiGrid = asciiGrid;
    this.clearEmptyTileCache();
    this.redraw();
  },


  // setColorScale: function() {
  //   let colors: Color[] = [];

  //   // uncertainty chart for now
  //   const colorScheme = ['red', 'yellow', 'green', 'blue', 'purple', 'indigo'];

  //   const range = this.options.colorScale.range;
  //   const colorScale = chroma.scale(colorScheme).domain(range);


  //   let span = range[1] - range[0];
  //   let numColors = 500; // number of colors in the scale
  //   let interval = span / numColors;

  //   let value: number;
  //   let i: number;
  //   for(i = 0, value = range[0]; i < numColors; i++, value += interval) {
  //     let color: Color = {r: 0, g: 0, b: 0, a: 0};
  //     let channels = colorScale(value);
  //     let [r, g, b, a] = channels.rgba();
  //     color.r = Math.round(r);
  //     color.g = Math.round(g);
  //     color.b = Math.round(b);
  //     color.a = Math.round(((a * 255) / 2) + 30);
  //     colors.push(color);
  //   }

  //   this.options.colorScale = {
  //     colors,
  //     range, 
  //   };

  //   this.redraw();
  // }, 

  //NEW COLOR SCALE SETTING
  setColorScale: function () {
    let colors: Color[] = [];

    // Vibrant white to red color scheme (low variance = light; high variance = dark red)
    const redColorScheme = ['#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026']

    // Use the provided range
    const range = this.options.colorScale?.range ?? [0, 1];
    const NUM_COLORS = 256;

    // Build a LUT from the ramp over your range
    const colorScale = chroma.scale(redColorScheme).domain(range);
    const step = (range[1] - range[0]) / NUM_COLORS; // Calculates the max value - min value range divided by the number of colors


    for (let i = 0; i < NUM_COLORS; i++) {
      const value = range[0] + i * step;

      // Work around @types/chroma-js: cast to any so .rgba() is callable on the scale result
      const channels = (colorScale(value) as any).rgba();
      const [r, g, b, a01] = channels;
      const alpha = a01 ?? 1;
      colors.push({
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
        a: Math.round(((alpha * 255) / 2) + 30)  // Semi-transparent like rainfall layer
      });
    }

    this.options.colorScale = { colors, range };
    this.redraw();
  },


  createTile: function (coords: any) {
    let coordString = JSON.stringify(coords);
    let tile: HTMLCanvasElement = L.DomUtil.create('canvas', 'leaflet-tile') as HTMLCanvasElement;
    let ctx = tile.getContext("2d");

    if ((!this.options.cacheEmpty || !this.options.cache.has(coordString)) && ctx != null) {
      let tileSize = this.getTileSize();
      tile.width = tileSize.x;
      tile.height = tileSize.y;
      let imgData = ctx.getImageData(0, 0, tileSize.x, tileSize.y);

      //get the coordinates of the tile corner, tile coords times scale
      let xMin = coords.x * tileSize.x;
      let yMin = coords.y * tileSize.y;
      let xMax = xMin + tileSize.x;
      let yMax = yMin + tileSize.y;

      let x = 0;
      let y = 0;
      let colorOff = 0;

      let hasValue = false;

      for (y = yMin; y < yMax; y++) {
        for (x = xMin; x < xMax; x++) {
          //unproject fast enough that unnecessary to decouple
          let latlng: L.LatLng = this._map.unproject([x, y], coords.z);

          let color = geoPosToColor(this.options.asciiGrid, latlng, this.options.colorScale);
          if (color != undefined) {
            hasValue = true;
            imgData.data[colorOff + 0] = color.r;
            imgData.data[colorOff + 1] = color.g;
            imgData.data[colorOff + 2] = color.b;
            imgData.data[colorOff + 3] = color.a;
          }
          colorOff += 4;
        }
      }

      //if caching empty tiles and tile had no values in it, add to empty tile cache
      if (this.options.cacheEmpty && !hasValue) {
        this.options.cache.add(coordString);
      }
      ctx.putImageData(imgData, 0, 0);
    }
    return tile;
  }
});

R.gridLayer.UncertaintyRasterLayer = function (options: RasterOptions) {
  return new R.GridLayer.UncertaintyRasterLayer(options);
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
