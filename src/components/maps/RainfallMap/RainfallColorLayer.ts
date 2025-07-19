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
  const xValid: boolean = x >= 0 && x < ncols;
  const yValid = y >= 0 && y < nrows;
  if (!xValid || !yValid) { // default to transparent
      return color;
  }
  const asciiGridLoc = ncols * y + x;
  const colorValue = asciiGrid.values[asciiGridLoc];

  // Using the file location/index, find the color that colorValue is mapped to
  const { colors, range } = colorScale;
  let rangePosition: number = colorValue < range[0] ? 0 :
                              colorValue > range[1] ? range[1] - range[0] :
                              colorValue - range[0];
  let scale = rangePosition / (range[1] - range[0]);
  let actualPosition = Math.round(scale * (colors.length - 1));

  return colors[actualPosition];
}

R.GridLayer.RasterLayer = L.GridLayer.extend({
  initialize: function(options: RasterOptions) {
    let rasterOptions: RasterOptions = {
      ...options
    };
    if(options.cacheEmpty) {
      rasterOptions.cache = new Set<string>();
    }
    else if(options.cacheEmpty == undefined) {
      rasterOptions.cacheEmpty = false;
    }
    L.Util.setOptions(this, rasterOptions);
    this.setColorScale();
  }, 

  clearEmptyTileCache: function() {
    if(this.options.cache) {
      this.options.cache.clear();
    }
  },

  // values: IndexedValues, header?: RasterHeader
  setData: function(asciiGrid: AsciiGrid) {
    this.options.asciiGrid = asciiGrid;
    this.clearEmptyTileCache();
    this.redraw();
  },

  setColorScale: function() {
    let colors: Color[] = [];
    
    // Standard rainbow chart for now
    const colorScheme = ['red', 'yellow', 'green', 'blue', 'purple', 'indigo'];

    const range = this.options.colorScale.range;

    const colorScale = chroma.scale(colorScheme).domain(range);

    let span = range[1] - range[0];
    let interval = span / 500; // 500 = numColors
    let value: number;
    let i: number;
    for(i = 0, value = range[0]; i < 500; i++, value += interval) {
      let color: Color = {r: 0, g: 0, b: 0, a: 0};
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

  createTile: function(coords: any) {
    let coordString = JSON.stringify(coords);
    let tile: HTMLCanvasElement = L.DomUtil.create('canvas', 'leaflet-tile') as HTMLCanvasElement;
    let ctx = tile.getContext("2d");

    if((!this.options.cacheEmpty || !this.options.cache.has(coordString)) && ctx != null) {
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

      for(y = yMin; y < yMax; y++) {
        for(x = xMin; x < xMax; x++) {
          //unproject fast enough that unnecessary to decouple
          let latlng: L.LatLng = this._map.unproject([x, y], coords.z);

          let color = geoPosToColor(this.options.asciiGrid, latlng, this.options.colorScale);
          if(color != undefined) {
            hasValue = true;
            imgData.data[colorOff] = color.r;
            imgData.data[colorOff + 1] = color.g;
            imgData.data[colorOff + 2] = color.b;
            imgData.data[colorOff + 3] = color.a;
          }
          colorOff += 4;
        }
      }

      //if caching empty tiles and tile had no values in it, add to empty tile cache
      if(this.options.cacheEmpty && !hasValue) {
        this.options.cache.add(coordString);
      }
      ctx.putImageData(imgData, 0, 0);
    }
    return tile;
  }
});

R.gridLayer.RasterLayer = function(options: RasterOptions) {
  return new R.GridLayer.RasterLayer(options);
};

const createRainfallComponent = (props: any, context: any) => {
  let rasterLayer = R.gridLayer.RasterLayer(props.options);

  /* Prevents selected basemap from overlapping the raster layer
  setTimeout here allows bringToFront() to run after re-renders are done */
  setTimeout(() => {
    rasterLayer.bringToFront();
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
