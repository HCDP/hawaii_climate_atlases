import React, { useMemo, useEffect } from "react";
import { LatLng, Map } from "leaflet";
import { useMap, ZoomControl } from "react-leaflet";
import LocationField from "../../LocationField";
import { LEAFLET_POSITIONS } from "@/constants";
import {Button} from "@nextui-org/button";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";

const parseLocation = (input: string): LatLng | null => {
  const [lat, lng] = input.split(",").map(s => parseFloat(s));
  if (lat && lng) {
    return new LatLng(lat, lng);
  } else {
    return null;
  }
}

const MapOverlay: React.FC<
  {
    onToggleMaximize: () => void,
    mapMaximized: boolean,
  }
> = ({ onToggleMaximize, mapMaximized }) => {
  const map: Map = useMap();

  const handleLocationChange = (input: string) => {
      const parsedLatLng = parseLocation(input);
      if (parsedLatLng !== null) {
          map.setView(parsedLatLng);
      }
  };

  // I put this here instead of in the onPress function because if I do that the resize might not happen properly.
  useEffect(() => {
    map.invalidateSize()
  }, [mapMaximized]);

  const overlay = useMemo(() => (
    <>
      <div className={LEAFLET_POSITIONS.topleft}>
        <div className="leaflet-control flex">
          <LocationField onLocationChange={handleLocationChange}/>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.topright}>
        <div className="leaflet-control rounded-full shadow-md">
          <Button
            onPress={onToggleMaximize}
            radius="full"
            size="lg"
            isIconOnly
            title="Maximize map(hide header and footer)"
            className="bg-white shadow-md"
          >
            {mapMaximized ? <FullscreenExit /> : <Fullscreen />}
          </Button>
        </div>
      </div>
      <div className={LEAFLET_POSITIONS.bottomleft}>
        Units
      </div>
      <div className={LEAFLET_POSITIONS.bottomright}>
        <ZoomControl position="bottomright" />
      </div>
    </>
  ), [mapMaximized]);

  return (
    <>
      {overlay}
    </>
  )
}

export default MapOverlay;
