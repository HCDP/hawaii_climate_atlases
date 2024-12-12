"use client"

import { Station } from "@/lib";
import { Circle, Polygon, Rectangle } from "react-leaflet";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface Props {
  station: Station,
  onClick: (station: Station) => void,
  scale: number,
}

export const StationIcon = forwardRef(function StationIcon(props: Props, ref) {
  const {
    station,
    onClick,
    scale,
  } = props;
  const shapeRef = useRef<Rectangle | Circle | Polygon>();
  const circleRadius = 240 * scale
  const rectangleDistance = 0.002 * scale
  const polygonDistance = 0.002 * scale
  useImperativeHandle(ref, () => {
    return {
      reSize (newScale: number) {
        let theRef;
        switch (station.StationStatus) {
          case "Current":
            theRef = shapeRef.current;
            const distanceFromCenter = rectangleDistance * newScale;
            theRef.setBounds([
              [station.Lat_DD - distanceFromCenter, station.Lon_DD - distanceFromCenter],
              [station.Lat_DD + distanceFromCenter, station.Lon_DD + distanceFromCenter]
            ]);
            return;
          case "Discontinued":
            theRef = shapeRef.current;
            const newRadius = circleRadius * newScale;
            theRef.setRadius(newRadius);
            return;
          case "Virtual":
            return;
        }
      }
    }
  });
  switch (station.StationStatus) {
    case "Current":
      return (
        <Rectangle
          bounds={[
            [station.Lat_DD - rectangleDistance, station.Lon_DD - rectangleDistance],
            [station.Lat_DD + rectangleDistance, station.Lon_DD + rectangleDistance]
          ]}
          pathOptions={{ color: 'green', weight: 1 }}
          eventHandlers={{
            click: () => onClick(station)
          }}
          ref={shapeRef}
        />
      );
    case "Discontinued":
      return (
        <Circle
          center={[station.Lat_DD, station.Lon_DD]}
          radius={circleRadius}
          pathOptions={{ color: 'red', weight: 1 }}
          eventHandlers={{
            click: () => onClick(station)
          }}
          ref={shapeRef}
        />
      );
    case "Virtual":
      return (
        <Polygon
          positions={[
            [station.Lat_DD + polygonDistance, station.Lon_DD],
            [station.Lat_DD, station.Lon_DD + polygonDistance],
            [station.Lat_DD - polygonDistance, station.Lon_DD],
            [station.Lat_DD, station.Lon_DD - polygonDistance],
          ]}
          pathOptions={{color: 'magenta', weight: 1}}
          eventHandlers={{
            click: () => onClick(station)
          }}
          ref={shapeRef}
        />
      );
  }
});
