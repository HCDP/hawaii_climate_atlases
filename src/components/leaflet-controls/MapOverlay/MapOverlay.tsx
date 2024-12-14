import React, { useState, useMemo, useCallback } from "react";
import { LatLng, Map } from "leaflet";
import { useMap, useMapEvent, MapContainer, TileLayer, Rectangle, ZoomControl } from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import LocationField from "../../LocationField";
import { LEAFLET_POSITIONS } from "@/constants";
import {Button} from "@nextui-org/button";
import Fullscreen from "@mui/icons-material/Fullscreen";

const parseLocation = (input: string): LatLng | null => {
  const [lat, lng] = input.split(",").map(s => parseFloat(s));
  if (lat && lng) {
    return new LatLng(lat, lng);
  } else {
    return null;
  }
}

export default function MapOverlay() {
  const map: Map = useMap();

  const handleLocationChange = (input: string) => {
      const parsedLatLng = parseLocation(input);
      if (parsedLatLng !== null) {
          map.setView(parsedLatLng);
      }
  };

  const topleft = useMemo(() => (
    <div className={LEAFLET_POSITIONS.topleft}>
      <div className="leaflet-control flex">
        <LocationField onLocationChange={handleLocationChange} />
      </div>
    </div>
  ), []);

  const topright = useMemo(() => (
    <div className={LEAFLET_POSITIONS.topright}>
      <div className="leaflet-control rounded-full shadow-md">
        <Button
          onPress={() => map.getContainer().focus()}
          radius="full"
          size="lg"
          isIconOnly
          title="Fit to screen"
          className="bg-white shadow-md"
        >
          <Fullscreen />
        </Button>
      </div>
    </div>
  ), []);

  return (
    <>
      {topleft}
      {topright}
    </>
  )
}
