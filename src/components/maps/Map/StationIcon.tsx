import React from "react";

interface Props {
  stationStatus: string,
  other?: boolean,
  showBorder?: boolean,
  transform?: string,
}

export const StationIcon: React.FC<Props> = ({
  stationStatus,
  other,
  showBorder = false,
  transform,
}) => {
  let color: string;
  switch (stationStatus) {
    case "Current":
      color = "rgb(90, 180, 0)";
      return (
        <path
          fill={other ? "rgb(255, 255, 255)" : color}
          fill-opacity="0.75"
          stroke={other ? color : "rgb(0, 0, 0)"}
          stroke-opacity={showBorder ? 1 : 0}
          stroke-width="2"
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
      color = "rgb(180, 90, 0)";
      return (
        <circle
          fill={other ? "rgb(255, 255, 255)" : color}
          fill-opacity="0.75"
          stroke={other ? color : "rgb(0, 0, 0)"}
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
      color = "rgb(180, 0, 115)";
      return (
        <path
          fill={other ? "rgb(255, 255, 255)" : color}
          fill-opacity="0.75"
          stroke={other ? color : "rgb(0, 0, 0)"}
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
