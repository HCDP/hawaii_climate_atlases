import React from "react";

interface Props {
  stationStatus: string,
  showBorder?: boolean,
  transform?: string,
}

export const StationIcon: React.FC<Props> = ({
  stationStatus,
  showBorder = false,
  transform,
}) => {
  switch (stationStatus) {
    case "Current":
      return (
        <path
          fill="rgb(90, 180, 0)"
          fillOpacity="0.75"
          stroke="rgb(0, 0, 0)"
          stroke-opacity={showBorder ? 1 : 0}
          stroke-width="1.5"
          stroke-linecap="square"
          stroke-linejoin={undefined}
          stroke-miterlimit="4"
          path="M 0,0 12,0 12,12 0,12 Z"
          d="M 0 0 12 0 12 12 0 12Z"
          fill-rule="evenodd"
          stroke-dasharray="none"
          transform={transform}
        />
      );
    case "Discontinued":
      return (
        <circle
          fill="rgb(180, 90, 0)"
          fill-opacity="0.755"
          stroke="rgb(0, 0, 0)"
          stroke-opacity={showBorder ? 1 : 0}
          stroke-width="1.5"
          stroke-linecap="square"
          stroke-linejoin={undefined}
          stroke-miterlimit="4"
          cx="6"
          cy="6"
          r="6"
          fill-rule="evenodd"
          stroke-dasharray="none"
          transform={transform}
        />
      );
    case "Virtual":
      return (
        <path
          fill="rgb(180, 0, 115)"
          fill-opacity="0.75"
          stroke="rgb(0, 0, 0)"
          stroke-opacity={showBorder ? 1 : 0}
          stroke-width="1.5"
          stroke-linecap="square"
          stroke-linejoin={undefined}
          stroke-miterlimit="4"
          path="M 0,6 6,12 12,6 6,0 Z"
          d="M 0 6 6 12 12 6 6 0Z"
          fill-rule="evenodd"
          stroke-dasharray="none"
          transform={transform}
        />
      );
    default:
      return null;
  }
}
