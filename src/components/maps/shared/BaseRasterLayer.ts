import { AsciiGrid } from "@/lib";
import chroma from "chroma-js";
import L, { LatLng } from "leaflet";

export interface RasterOptions {
  cacheEmpty?: boolean;
  colorScale: ColorScale;
  asciiGrid: AsciiGrid;
  cache?: Set<string>;
  colorScheme?: string[] | string;  // e.g., ['red', 'yellow', 'green'] or 'rainbow'
  colorPadding?: number;            // Optional padding value passed to chroma.scale().padding()
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ColorScale = {
  colors: Color[];
  range: [number, number];
}


/**
 * Converts a geographic position to a color based on the ASCII grid data and color scale
 * A core algorithm used by all raster layers
 */
export function geoPosToColor(asciiGrid: AsciiGrid, geoPos: LatLng, colorScale: ColorScale): Color {
  let color: Color = {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  };
  const { ncols, nrows, xllcorner, yllcorner, cellsize } = asciiGrid.header;
  const offset = new LatLng(geoPos.lat - yllcorner, geoPos.lng - xllcorner);

  // Find LatLng location in the ASCII file to grab its corresponding data subject value
  const x = Math.floor(offset.lng / cellsize);
  const y = Math.floor(nrows - offset.lat / cellsize);
  
  // Check if coordinates are within the grid range
  const xValid: boolean = x >= 0 && x < ncols;
  const yValid = y >= 0 && y < nrows;
  
  if (!xValid || !yValid) {
    return color; // Return transparent for out-of-bounds
  }

  const asciiGridLoc = ncols * y + x;
  const colorValue = asciiGrid.values[asciiGridLoc];

  // Handle no data values
  const nodata = (asciiGrid as any)?.header?.NODATA_value ?? (asciiGrid as any)?.header?.nodata;
  if (!Number.isFinite(colorValue) || (nodata !== undefined && colorValue === nodata)) {
    return { r: 0, g: 0, b: 0, a: 0 }; // transparent
  }

  // Using the file location/index, find the color colorValue is mapped to
  const { colors, range } = colorScale;
  let rangePosition: number = colorValue < range[0] ? 0 :
    colorValue > range[1] ? range[1] - range[0] :
        colorValue - range[0];
  let scale = rangePosition / (range[1] - range[0]);

  let actualPosition = Math.round(scale * (colors.length - 1));

  return colors[actualPosition];
}

/**
 * Base GridLayer that renders raster data from ASCII grids
 * Export to use different color schemes for different subjects (e.g., rainfall, uncertainty, etc.)
 */
export const createBaseRasterLayer = (layerName: string) => {
  return L.GridLayer.extend({
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

    setData: function (asciiGrid: AsciiGrid) {
      this.options.asciiGrid = asciiGrid;
      this.clearEmptyTileCache();
      this.redraw();
    },

    /**
     * Builds the color lookup table based on the color scheme
     */
    setColorScale: function () {
      let colors: Color[] = [];

      // Default color scheme is rainbow if no scheme is specified
      const colorScheme = this.options.colorScheme || ['red', 'yellow', 'green', 'blue', 'purple', 'indigo'];
      const range = this.options.colorScale.range;
        // Build chroma scale using explicit domain and optional padding from `colorPadding`.
        const colorScale = chroma
          .scale(colorScheme)
          .domain(range)
          .padding(this.options.colorPadding ?? 0); // Optional color curve adjustment for better contrast

      let span = range[1] - range[0];
      let interval = span / 500; // 500 = numColors
      let value: number;
      let i: number;

      const debugMapping = []; // For debugging: log value-color mappings

      for (i = 0, value = range[0]; i < 500; i++, value += interval) {
        let color: Color = { r: 0, g: 0, b: 0, a: 0 };
        let channels = colorScale(value);
        let [r, g, b, a] = channels.rgba();
        color.r = Math.round(r);
        color.g = Math.round(g);
        color.b = Math.round(b);
        color.a = Math.round(((a * 255) / 2) + 30);
        colors.push(color);
      }

      this.options.colorScale = {
        colors,
        range,
      };

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

        // Get the coordinates of the tile corner, tile coords times scale
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
            // unproject fast enough that unncessary to decouple
            let latlng: L.LatLng = this._map.unproject([x, y], coords.z);

            let color = geoPosToColor(
              this.options.asciiGrid,
              latlng,
              this.options.colorScale,
            );
            if (color != undefined) {
              hasValue = true;
              imgData.data[colorOff++] = color.r;
              imgData.data[colorOff++] = color.g;
              imgData.data[colorOff++] = color.b;
              imgData.data[colorOff++] = color.a;
            } else {
              colorOff += 4;
            }
          }
        }

        //if caching empty tiles and tile had no values in it, add to empty tile cache
        if (hasValue) {
          ctx.putImageData(imgData, 0, 0);
        } else if (this.options.cacheEmpty) {
          this.options.cache.add(coordString);
        }
      }
      return tile;
    }
  });
};
