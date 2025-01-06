import React from "react";
import { Station } from "@/lib";
import { Circle, Polygon, Rectangle } from "react-leaflet";
import { LatLng } from "leaflet";

interface Props {
  station: Station,
  onClick: (station: Station) => void,
  center: LatLng,
  radius: number,
  outline: boolean,
}

export const StationIcon: React.FC<Props> = ({ station, onClick, center, radius, outline }) => {
  const bounds = center.toBounds(2 * radius);
  switch (station.StationStatus) {
    case "Current": return (
      <Rectangle
        bounds={bounds}
        pathOptions={{ color: 'black', fillColor: 'green', weight: outline ? 1 : 0, fillOpacity: 1  }}
        eventHandlers={{
          click: () => onClick(station)
        }}
      />
    );
    case "Discontinued": return (
      <Circle
        center={center}
        radius={radius}
        pathOptions={{ color: 'black', fillColor: 'red', weight: outline ? 1 : 0, fillOpacity: 1 }}
        eventHandlers={{
          click: () => onClick(station)
        }}
      />
    );
    case "Virtual": return (
      <Polygon
        positions={[
          [bounds.getNorth(), bounds.getCenter().lng],
          [bounds.getCenter().lat, bounds.getEast()],
          [bounds.getSouth(), bounds.getCenter().lng],
          [bounds.getCenter().lat, bounds.getWest()],
        ]}
        pathOptions={{ color: 'black', fillColor: 'magenta', weight: outline ? 1 : 0, fillOpacity: 1 }}
        eventHandlers={{
          click: () => onClick(station)
        }}
      />
    );
    default: return null;
  }
}
