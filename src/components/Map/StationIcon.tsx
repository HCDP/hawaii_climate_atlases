import { Station } from '.'
import { Circle, Polygon, Rectangle } from "react-leaflet";
import React, { forwardRef } from "react";

const StationIcon = forwardRef(function StationIcon(props, ref) {
  const { station, onClick } = props;
  const radius = 100;
  // switch (station.StationStatus) {
  //   case "Current":
  //     return (
  //       <Rectangle
  //         bounds={[[station.Lat_DD - 0.001, station.Lon_DD - 0.001], [station.Lat_DD + 0.001, station.Lon_DD + 0.001]]}
  //         pathOptions={{color: 'green'}}
  //         eventHandlers={{
  //           click: () => onClick(station)
  //         }}
  //         ref={ref}
  //       />
  //     );
  //   case "Discontinued":
  //     return (
  //       <Circle
  //         center={[station.Lat_DD, station.Lon_DD]}
  //         radius={radius}
  //         pathOptions={{color: 'red'}}
  //         eventHandlers={{
  //           click: () => onClick(station)
  //         }}
  //         ref={ref}
  //       />
  //     );
  //   case "Virtual":
  //     return (
  //       <Polygon
  //         positions={[
  //           [station.Lat_DD + 0.002, station.Lon_DD],
  //           [station.Lat_DD, station.Lon_DD + 0.002],
  //           [station.Lat_DD - 0.002, station.Lon_DD],
  //           [station.Lat_DD, station.Lon_DD - 0.002],
  //         ]}
  //         pathOptions={{color: 'magenta'}}
  //         eventHandlers={{
  //           click: () => onClick(station)
  //         }}
  //         ref={ref}
  //       />
  //     );
  // }
      return (
        <Circle
          center={[station.Lat_DD, station.Lon_DD]}
          radius={radius}
          pathOptions={{color: 'red'}}
          eventHandlers={{
            click: () => onClick(station)
          }}
          ref={ref}
        />
      );
});

export default StationIcon;
