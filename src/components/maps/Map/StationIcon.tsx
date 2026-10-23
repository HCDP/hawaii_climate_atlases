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
          fillOpacity="0.75"
          stroke={other ? color : "rgb(0, 0, 0)"}
          strokeOpacity={showBorder ? 1 : 0}
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin={undefined}
          strokeMiterlimit="4"
          path="M 0,0 12,0 12,12 0,12 Z"
          d="M 0 0 12 0 12 12 0 12Z"
          fillRule="evenodd"
          strokeDasharray="none"
          transform={transform}
        />
      );
    case "Discontinued":
      color = "rgb(180, 90, 0)";
      return (
        <circle
          fill={other ? "rgb(255, 255, 255)" : color}
          fillOpacity="0.75"
          stroke={other ? color : "rgb(0, 0, 0)"}
          strokeOpacity={showBorder ? 1 : 0}
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin={undefined}
          strokeMiterlimit="4"
          cx="6"
          cy="6"
          r="6"
          fillRule="evenodd"
          strokeDasharray="none"
          transform={transform}
        />
      );
    case "Virtual":
      color = "rgb(180, 0, 115)";
      return (
        <path
          fill={other ? "rgb(255, 255, 255)" : color}
          fillOpacity="0.75"
          stroke={other ? color : "rgb(0, 0, 0)"}
          strokeOpacity={showBorder ? 1 : 0}
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin={undefined}
          strokeMiterlimit="4"
          path="M 0,6 6,12 12,6 6,0 Z"
          d="M 0 6 6 12 12 6 6 0Z"
          fillRule="evenodd"
          strokeDasharray="none"
          transform={transform}
        />
      );
    default:
      return null;
  }
}
